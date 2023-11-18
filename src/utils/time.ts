import { CandidateTimeInfo } from "@/types/candidateTime";

const extractHourAndMinute = (time: string) => {
  const [hour, minute] = time.split(":").map(Number);

  return [hour, minute];
};

export const getAllTimeRange = (startTime: string, endTime: string) => {
  const [startHour] = extractHourAndMinute(startTime);
  const [endHour] = extractHourAndMinute(endTime);

  return Array.from(
    { length: endHour - startHour + 1 },
    (_, i) => startHour + i
  );
};

export const getTimeTableValues = (allTimeRange: number[]) =>
  allTimeRange
    .map((time) => [
      `${String(time).padStart(2, "0")}:00`,
      `${String(time).padStart(2, "0")}:30`,
    ])
    .flat();

export const canSelect = (
  idx: number,
  target: string,
  endIdx: number,
  startTime: string,
  endTime: string
) =>
  (idx == 0 && startTime !== target) || (idx == endIdx && endTime !== target);

export const extractTimeDataset = (elements: HTMLElement[]) =>
  elements.map((el) => el.dataset.time || "");

const getTotalMinutes = (hour: number, minute: number) =>
  hour * 60 + minute + 30;

export const isSequentialTimes = (start: string, end: string) => {
  const [startHour, startMinute] = extractHourAndMinute(start);
  const [endHour, endMinute] = extractHourAndMinute(end);

  const startTotalTime = getTotalMinutes(startHour, startMinute);
  const endTotalTime = getTotalMinutes(endHour, endMinute);

  return endTotalTime - startTotalTime === 30;
};

export const add30Minutes = (time: string) => {
  const [hour, minute] = extractHourAndMinute(time);

  const totalMinutes = getTotalMinutes(hour, minute);

  const stringHour = String(Math.floor(totalMinutes / 60)).padStart(2, "0");
  const stringMinute = String(totalMinutes % 60).padStart(2, "0");

  return `${stringHour}:${stringMinute}`;
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

export const getTimestampFromTime = (time: string) =>
  new Date(`2000-01-01 ${time}`).getTime();

export const getTimeInterval = (
  startStringTime: string,
  endStringTime: string
) => {
  const startTime = getTimestampFromTime(startStringTime);
  const endTime = getTimestampFromTime(endStringTime);

  return endTime - startTime;
};