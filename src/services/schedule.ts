import { getMeetingInfo } from "@/services/meeting";
import {
  ScheduleTimeRangeInfo,
  CandidateTimeInfo,
} from "@/types/candidateTime";
import { ScheduleForm } from "@/types/meeting";
import { add30Minutes, isSequentialTimes } from "@/utils/time";
import supabase from "./init";

const getCandidateTimes = (meetingId: string) => {
  return supabase
    .from("Meeting")
    .select()
    .eq("id", meetingId)
    .select("candidates");
};

const addCandidateTime = (
  arr: ScheduleTimeRangeInfo[],
  startTime: string,
  endTime: string
) => {
  arr.push({
    startTime,
    endTime,
  });
};

const genCandidateTimes = (schedule: string[]) => {
  const candidateTimes: ScheduleTimeRangeInfo[] = [];

  for (let i = 0; i < schedule.length; i++) {
    const startTime = schedule[i];

    addCandidateTime(candidateTimes, startTime, add30Minutes(startTime));

    for (let j = i + 1; j < schedule.length; j++) {
      if (!isSequentialTimes(schedule[j - 1], schedule[j])) break;

      addCandidateTime(candidateTimes, startTime, add30Minutes(schedule[j]));
    }
  }

  return candidateTimes;
};

const isDuplicatedCandidate = (
  currCandidateTime: ScheduleTimeRangeInfo,
  personalCandidateTimes: ScheduleTimeRangeInfo[]
) => {
  const { startTime: currCandidateStartTime, endTime: currCandidateEndTime } =
    currCandidateTime;

  return personalCandidateTimes.findIndex((candidateTime) => {
    const { startTime, endTime } = candidateTime;

    return (
      startTime == currCandidateStartTime && endTime == currCandidateEndTime
    );
  });
};

const getAdditionalCandidateTimes = (
  candidateTimes: ScheduleTimeRangeInfo[],
  name: string
) => {
  return candidateTimes.map((candidateTime) => ({
    ...candidateTime,
    members: [name],
  }));
};

const getUpdatedCandidates = (
  { name, schedule: personalSchedule }: ScheduleForm,
  currCandidateTimeInfos: CandidateTimeInfo[]
) => {
  const personalCandidateTimes = genCandidateTimes(personalSchedule);

  const updatedCurrCandidateTimeInfos = currCandidateTimeInfos.map(
    (candidateTimeInfo) => {
      const IndexOfDuplicatedTimeCandidate = isDuplicatedCandidate(
        candidateTimeInfo,
        personalCandidateTimes
      );

      if (IndexOfDuplicatedTimeCandidate !== -1) {
        personalCandidateTimes.splice(IndexOfDuplicatedTimeCandidate, 1);

        return {
          ...candidateTimeInfo,
          members: [...candidateTimeInfo.members, name],
        };
      }
      return candidateTimeInfo;
    }
  );

  const additionalCandidateTimes = getAdditionalCandidateTimes(
    personalCandidateTimes,
    name
  );

  return [...updatedCurrCandidateTimeInfos, ...additionalCandidateTimes];
};

export const createSchedule = async (
  meetingId: string,
  personalScheduleForm: ScheduleForm
) => {
  const { data: meetingInfo, error } = await getMeetingInfo(meetingId);

  if (!meetingInfo || error) throw new Error("error");

  const { candidates: currCandidateTimeInfos, members } = meetingInfo;

  const updatedCandidates = getUpdatedCandidates(
    personalScheduleForm,
    currCandidateTimeInfos
  );

  return supabase
    .from("Meeting")
    .update({
      candidates: updatedCandidates,
      members: [...members, personalScheduleForm.name],
    })
    .eq("id", meetingId);
};
