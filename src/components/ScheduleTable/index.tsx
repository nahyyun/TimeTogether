import React from "react";
import {
  canSelect,
  getAllTimeRange,
  getTimeStringArray,
} from "@/utils/timeRange";
import * as S from "./style";
import { Meeting } from "@/types/meeting";

interface ScheduleTableProps {
  isAvailable?: boolean;
  meetingInfo: Meeting;
}

export default function ScheduleTable({
  isAvailable,
  meetingInfo: { date, timeRange },
}: ScheduleTableProps) {
  const [startTime, endTime] = timeRange;

  const allTimeRange = getAllTimeRange(startTime, endTime);
  const timeArray = getTimeStringArray(allTimeRange);

  return (
    <S.ScheduleTableContainer>
      <S.TableHeader>{new Date(date).getDate()}일</S.TableHeader>

      {allTimeRange.slice(1).map((time, idx) => (
        <S.TimeScale key={idx} idx={idx}>
          {time}
        </S.TimeScale>
      ))}

      {timeArray.map((time, idx, arr) => (
        <React.Fragment key={idx}>
          <S.TimeBlock
            data-time={time}
            disabled={canSelect(idx, time, arr.length - 1, startTime, endTime)}
          />
        </React.Fragment>
      ))}
    </S.ScheduleTableContainer>
  );
}
