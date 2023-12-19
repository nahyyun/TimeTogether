import React, { forwardRef } from "react";
import { PropsWithOptionalChildren } from "@/types/propsWithChildren";
import { canSelect } from "@/utils/time";
import { Meeting } from "@/types/meeting";
import { dragSelectionRefs } from "../ScheduleRegistForm";
import { DAYS_OF_WEEK_EN } from "@/constants/day";
import * as S from "./style";
import { extractDatePartsFromStringType } from "@/utils/date";
import { CalendarIcon } from "../Icons";

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
      date: dateInfo,
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

  const { date, day } = extractDatePartsFromStringType(dateInfo);

  return (
    <S.ScheduleTableContainer>
      <S.TableHeader>
        <S.Day>{DAYS_OF_WEEK_EN[day].slice(0, 3)}</S.Day>
        <S.Date>
          <CalendarIcon />
          {date}
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
