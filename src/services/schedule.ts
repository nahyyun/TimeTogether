import { getMeetingInfo } from "@/services/meeting";
import {
  ScheduleTimeRangeInfo,
  CandidateTimeInfo,
} from "@/types/candidateTime";
import { ScheduleForm } from "@/types/meeting";
import {
  add30Minutes,
  getTimeInterval,
  getTimestampFromTime,
  isSequentialTimes,
} from "@/utils/time";
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

/**
 * 큰 시간 간격 기준, 그 후 빠른 시작 시간을 기준으로 내림차순 정렬하기 위해 정렬 순서를 정의하는 함수
 * @param prevDataTime 이전 요소
 * @param currDataTime 현재 요소
 * @returns 정렬 순서를 정의하기 위한 숫자
 */
const compareTimeIntervalsAndStartTimes = (
  {
    startTime: prevDataStartTime,
    endTime: prevDataEndTime,
  }: ScheduleTimeRangeInfo,
  {
    startTime: currDataStartTime,
    endTime: currDataEndTime,
  }: ScheduleTimeRangeInfo
) => {
  const timeIntervalDiff =
    getTimeInterval(prevDataStartTime, prevDataEndTime) -
    getTimeInterval(currDataStartTime, currDataEndTime);

  if (timeIntervalDiff > 0) return -1;
  else if (timeIntervalDiff < 0) return 1;
  else
    return (
      getTimestampFromTime(prevDataStartTime) -
      getTimestampFromTime(prevDataEndTime)
    );
};

/**
 * 참여자 수, 큰 시간 간격, 빠른 시작 시간을 기준으로 후보 시간대를 내림차순 정렬하는 함수
 * @param target 정렬할 후보 시간대 배열
 * @returns 정렬된 배열
 */
const sortCandidatesByMultipleFactors = (target: CandidateTimeInfo[]) => {
  return target.sort(
    (
      { members: prevDataMembers, ...prevDataTime },
      { members: currDataMembers, ...currDataTime }
    ) => {
      if (prevDataMembers.length > currDataMembers.length) return -1;
      else if (prevDataMembers.length < currDataMembers.length) return 1;
      else {
        return compareTimeIntervalsAndStartTimes(prevDataTime, currDataTime);
      }
    }
  );
};

export const createSchedule = async (
  meetingId: string,
  personalScheduleForm: ScheduleForm
) => {
  const { data: meetingInfo, error } = await getMeetingInfo(meetingId);

  if (!meetingInfo || error) throw new Error("error");

  const { candidates: currCandidateTimeInfos, members } = meetingInfo;

  const updatedCandidates = sortCandidatesByMultipleFactors(
    getUpdatedCandidates(personalScheduleForm, currCandidateTimeInfos)
  );

  return supabase
    .from("Meeting")
    .update({
      candidates: updatedCandidates,
      members: [...members, personalScheduleForm.name],
    })
    .eq("id", meetingId);
};
