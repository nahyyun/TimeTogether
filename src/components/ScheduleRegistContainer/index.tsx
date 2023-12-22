import { useRef, useState } from "react";
import { Meeting } from "@/types/meeting";
import Button from "../Common/Button";
import DragSelector from "../DragSelector";
import ToggleButton from "../ToggleButton";
import ScheduleTable from "../ScheduleTable";
import * as S from "./style";
import {
  extractTimeDataset,
  getAllTimeRange,
  getTimeTableValues,
} from "@/utils/time";
import Spinner from "../Common/Spinner";
import { MdMarginDiv } from "@/styles/commonStyle";
import { TIME_ITEM_HEIGHT } from "@/constants/scroll";
import { TABLE_HEADER_HEIGHT, TIME_BLOCK_HEIGHT } from "../ScheduleTable/style";

interface ScheduleRegistContainerProps {
  name: string;
  meetingInfo: Meeting;
  setScheduleTime: (schedule: string[]) => void;
  mappedTrueToPersonalTimeSlots?: { [key: string]: boolean };
  isFetching?: boolean;
  isSubmitting?: boolean;
}

export interface dragSelectionRefs {
  dragContainerRef: HTMLDivElement | null;
  selectableTargetsRefs: HTMLElement[];
}

export default function ScheduleRegistContainer({
  name,
  meetingInfo,
  setScheduleTime,
  mappedTrueToPersonalTimeSlots = {},
  isFetching,
  isSubmitting,
}: ScheduleRegistContainerProps) {
  const [isAvailable, setIsAvailable] = useState(true);

  const [startTime, endTime] = meetingInfo.timeRange;

  const allTimeRange = getAllTimeRange(startTime, endTime);
  const timeTableValues = getTimeTableValues(allTimeRange);

  const dragSelectionRefs = useRef<dragSelectionRefs>({
    dragContainerRef: null,
    selectableTargetsRefs: [],
  });

  const toggle = (status: boolean) => {
    setIsAvailable(status);
  };

  const getSelectedTime = (selectedList: HTMLElement[]) => {
    const selectedTimeStringList = extractTimeDataset(selectedList);

    if (!isAvailable)
      return timeTableValues.filter(
        (value) => !selectedTimeStringList.includes(value)
      );

    return selectedTimeStringList;
  };

  const LAYOUT_HEIGHT =
    timeTableValues.length * TIME_BLOCK_HEIGHT + TABLE_HEADER_HEIGHT;

  return (
    <>
      <S.Heading>
        {name}님의
        <br />
        <ToggleButton isChecked={isAvailable} toggle={toggle} />
        시간을 선택해주세요.
      </S.Heading>
      <S.ContentLayout height={LAYOUT_HEIGHT}>
        {isFetching || isSubmitting ? (
          <Spinner />
        ) : (
          <ScheduleTable
            meetingInfo={meetingInfo}
            ref={dragSelectionRefs}
            allTimeRange={allTimeRange}
            timeTableValues={timeTableValues}
            mappedTrueToPersonalTimeSlots={mappedTrueToPersonalTimeSlots}
          >
            <DragSelector
              dragSelectionRefs={dragSelectionRefs.current}
              onSelect={(selected: HTMLElement[]) =>
                setScheduleTime(getSelectedTime(selected))
              }
            />
          </ScheduleTable>
        )}
      </S.ContentLayout>
      <MdMarginDiv />
      <Button type="submit" size="full-width">
        {isSubmitting ? <Spinner size="sm" /> : "일정 등록 완료"}
      </Button>
    </>
  );
}
