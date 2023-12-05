import React, { forwardRef } from "react";
import { PropsWithOptionalChildren } from "@/types/propsWithChildren";
import { canSelect } from "@/utils/time";
import { Meeting } from "@/types/meeting";
import { dragSelectionRefs } from "../ScheduleRegistForm";
import { daysOfWeek } from "@/constants/day";
import * as S from "./style";
import { FcCalendar } from "react-icons/fc";

interface ScheduleTableProps {
  meetingInfo: Meeting;
  allTimeRange: number[];
  timeTableValues: string[];
  mappedTrueToPersonalTimeSlots?: { [key: string]: boolean };
  mappedMembersByTimeSlots?: { [key: string]: string[] };
  availableTotalMemberCnt?: number;
}

const ScheduleTable = forwardRef<
  dragSelectionRefs,
  PropsWithOptionalChildren<ScheduleTableProps>
>(function ScheduleTable(
  {
    meetingInfo: {
      date,
      timeRange: [startTime, endTime],
    },
    allTimeRange,
    timeTableValues,
    mappedTrueToPersonalTimeSlots = {},
    mappedMembersByTimeSlots = {},
    availableTotalMemberCnt = 1,
    children,
  }: PropsWithOptionalChildren<ScheduleTableProps>,
  ref
) {
  if (typeof ref == "function") return null;

  return (
    <S.ScheduleTableContainer>
      <S.TableHeader>
        <S.Day>{daysOfWeek[new Date(date).getDay()].slice(0, 3)}</S.Day>
        <S.Date>
          <FcCalendar size={23} />
          {new Date(date).getDate()}
        </S.Date>
      </S.TableHeader>

      {allTimeRange.map((time, idx) => (
        <S.TimeScale key={idx} idx={idx}>
          {time < 12 ? time + " AM" : time + " PM"}
        </S.TimeScale>
      ))}

      {children}

      <S.TimeBlocksWrapper
        ref={(el) => el && ref?.current && (ref.current.dragContainerRef = el)}
      >
        {timeTableValues.map((time, idx, arr) => (
          <React.Fragment key={idx}>
            <S.TimeBlock
              className={
                mappedTrueToPersonalTimeSlots[time] ||
                mappedMembersByTimeSlots[time]
                  ? "selected"
                  : undefined
              }
              availableMemberCntByTime={mappedMembersByTimeSlots[time]?.length}
              availableMemberCnt={availableTotalMemberCnt}
              data-time={time}
              disabled={canSelect(
                idx,
                time,
                arr.length - 1,
                startTime,
                endTime
              )}
              ref={(el) => {
                el &&
                  ref?.current?.selectableTargetsRefs &&
                  (ref.current.selectableTargetsRefs[idx] = el);
              }}
            />
          </React.Fragment>
        ))}
      </S.TimeBlocksWrapper>
    </S.ScheduleTableContainer>
  );
});

export default ScheduleTable;
