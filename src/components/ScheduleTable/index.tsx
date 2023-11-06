import React, { forwardRef } from "react";
import { PropsWithOptionalChildren } from "@/types/propsWithChildren";
import {
  canSelect,
  getAllTimeRange,
  getTimeStringArray,
} from "@/utils/timeRange";
import { Meeting } from "@/types/meeting";
import * as S from "./style";
import { dragSelectionRefs } from "../ScheduleRegistForm";

interface ScheduleTableProps {
  isAvailable?: boolean;
  meetingInfo: Meeting;
  selected: HTMLElement[];
}

const ScheduleTable = forwardRef<
  dragSelectionRefs,
  PropsWithOptionalChildren<ScheduleTableProps>
>(function ScheduleTable(
  {
    isAvailable,
    meetingInfo: { date, timeRange },
    children,
  }: PropsWithOptionalChildren<ScheduleTableProps>,
  ref
) {
  const [startTime, endTime] = timeRange;

  const allTimeRange = getAllTimeRange(startTime, endTime);
  const timeArray = getTimeStringArray(allTimeRange);

  if (!ref || typeof ref == "function") return null;

  return (
    <S.ScheduleTableContainer
      ref={(el) => el && ref.current && (ref.current.dragContainerRef = el)}
    >
      <S.TableHeader>{new Date(date).getDate()}일</S.TableHeader>

      {allTimeRange.slice(1).map((time, idx) => (
        <S.TimeScale key={idx} idx={idx}>
          {time}
        </S.TimeScale>
      ))}

      {children}
      {timeArray.map((time, idx, arr) => (
        <React.Fragment key={idx}>
          <S.TimeBlock
            data-time={time}
            disabled={canSelect(idx, time, arr.length - 1, startTime, endTime)}
            ref={(el) =>
              el &&
              ref.current?.selectableTargetsRefs &&
              (ref.current.selectableTargetsRefs[idx] = el)
            }
          >
            {time}
          </S.TimeBlock>
        </React.Fragment>
      ))}
    </S.ScheduleTableContainer>
  );
});

export default ScheduleTable;
