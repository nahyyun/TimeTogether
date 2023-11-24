import {
  CandidateTimeInfo,
  ScheduleTimeRangeInfo,
} from "@/types/candidateTime";
import { add30Minutes, isSequentialTimes } from "@/utils/time";
import { getTimeInterval, getTimestampFromTime } from "./time";

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

export const genCandidateTimes = (schedule: string[]) => {
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

const findDuplicatedDataIdx = (
  totalCandidateTimes: ScheduleTimeRangeInfo[],
  currCandidateTime: ScheduleTimeRangeInfo
) => {
  const { startTime: currCandidateStartTime, endTime: currCandidateEndTime } =
    currCandidateTime;

  return totalCandidateTimes.findIndex((candidateTime) => {
    const { startTime, endTime } = candidateTime;

    return (
      startTime == currCandidateStartTime && endTime == currCandidateEndTime
    );
  });
};

/**
 * 모든 가능한 모임 시간대와 멤버들의 정보를 담은 객체로 이루어진 배열을 생성하는 함수
 * @param members 각 멤버의 이름과 시간 정보로 이루어진 객체들이 담긴 배열
 * @returns 모든 가능한 모임 시작 시간, 종료 시간, 참여 가능한 멤버 배열로 이루어진 객체들이 담긴 배열
 */
export const getUpdatedCandidates = (
  members: {
    name: string;
    schedule: string[];
  }[]
) => {
  const updatedCandidates: CandidateTimeInfo[] = [];

  members.forEach(({ name, schedule }) => {
    const personalCandidateTimes = genCandidateTimes(schedule);

    personalCandidateTimes.forEach(({ startTime, endTime }) => {
      if (updatedCandidates.length === 0)
        return updatedCandidates.push({ startTime, endTime, members: [name] });

      const duplicatedTimeRange = findDuplicatedDataIdx(updatedCandidates, {
        startTime,
        endTime,
      });

      if (duplicatedTimeRange === -1)
        return updatedCandidates.push({ startTime, endTime, members: [name] });

      updatedCandidates[duplicatedTimeRange] = {
        ...updatedCandidates[duplicatedTimeRange],
        members: [...updatedCandidates[duplicatedTimeRange].members, name],
      };
    });
  });

  return updatedCandidates;
};

/**
 * 모든 time slot을 기준으로 참여가능한 멤버들의 배열을 매핑한 객체를 생성하는 함수
 * @param candidates  후보 시간대 배열
 * @returns time slot key - available members array value map
 */
export const mapMembersToTimeSlots = (candidates: CandidateTimeInfo[]) => {
  const initValue = { [candidates[0].startTime]: candidates[0].members };

  return candidates.reduce(
    (acc: { [key: string]: string[] }, { startTime, members }) => {
      acc[startTime] = !acc[startTime]
        ? members
        : Array.from(new Set([...acc[startTime], ...members]));

      return acc;
    },
    initValue
  );
};

/**
 * 한 멤버의 모든 time slot을 기준으로 true boolean 값을 매핑한 객체를 생성하는 함수
 * @param candidates 시작 시간과 종료 시간으로 이루어진 객체 배열
 * @returns time slot key - true boolean value map
 */
export const mapTrueToPersonalTimeSlots = (
  candidates: ScheduleTimeRangeInfo[]
) => {
  const initValue = { [candidates[0].startTime]: true };

  return candidates.reduce((acc: { [key: string]: boolean }, { startTime }) => {
    acc[startTime] = true;

    return acc;
  }, initValue);
};

/**
 * 큰 시간 간격 기준 내림차순, 그 후 빠른 시작 시간을 기준으로 오름차순 정렬하기 위해 정렬 순서를 정의하는 함수
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
      getTimestampFromTime(currDataStartTime)
    );
};

/**
 * 참여자 수 기준 내림차순, 큰 시간 간격 기준 내림차순, 빠른 시작 시간 기준 오름차순으로 후보 시간대를 정렬하는 함수
 * @param target 정렬할 후보 시간대 배열
 * @returns 정렬된 배열
 */
export const sortCandidatesByMultipleFactors = (
  target: CandidateTimeInfo[]
) => {
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
