export interface ScheduleTimeRangeInfo {
  startTime: string;
  endTime: string;
}

export type CandidateTimeInfo = ScheduleTimeRangeInfo & {
  members: string[];
};
