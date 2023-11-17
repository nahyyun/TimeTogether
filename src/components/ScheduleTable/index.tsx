import React, { forwardRef } from "react";
import { PropsWithOptionalChildren } from "@/types/propsWithChildren";
import { canSelect } from "@/utils/time";
import { Meeting } from "@/types/meeting";
import { dragSelectionRefs } from "../ScheduleRegistForm";
import { daysOfWeek } from "@/constants/day";
import * as S from "./style";

interface ScheduleTableProps {
  meetingInfo: Meeting;
  allTimeRange: number[];
  timeTableValues: string[];
  timeMembersMap?: { [key: string]: string[] };
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
    timeMembersMap = {},
    availableTotalMemberCnt = 0,
    children,
  }: PropsWithOptionalChildren<ScheduleTableProps>,
  ref
) {
  if (typeof ref == "function") return null;

  return (
    <S.ScheduleTableContainer
      ref={(el) => el && ref?.current && (ref.current.dragContainerRef = el)}
    >
      <S.TableHeader>
        <S.Day>{daysOfWeek[new Date(date).getDay()]}</S.Day>
        <S.Date> {new Date(date).getDate()}</S.Date>
      </S.TableHeader>

      {allTimeRange.map((time, idx) => (
        <S.TimeScale key={idx} idx={idx}>
          {time < 12 ? time + " AM" : time + " PM"}
        </S.TimeScale>
      ))}

      {children}

      <S.TimeBlocksWrapper>
        {timeTableValues.map((time, idx, arr) => (
          <React.Fragment key={idx}>
            <S.TimeBlock
              className={timeMembersMap[time] ? "selected" : undefined}
              availableMemberCntByTime={timeMembersMap[time]?.length}
              availableMemberCnt={availableTotalMemberCnt}
              data-time={time}
              disabled={canSelect(
                idx,
                time,
                arr.length - 1,
                startTime,
                endTime
              )}
              ref={(el) =>
                el &&
                ref?.current?.selectableTargetsRefs &&
                (ref.current.selectableTargetsRefs[idx] = el)
              }
            />
          </React.Fragment>
        ))}
      </S.TimeBlocksWrapper>
    </S.ScheduleTableContainer>
  );
});

export default ScheduleTable;
