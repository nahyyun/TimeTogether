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

interface ScheduleRegistFormProps {
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

export default function ScheduleRegistForm({
  name,
  meetingInfo,
  setScheduleTime,
  mappedTrueToPersonalTimeSlots = {},
  isFetching,
  isSubmitting,
}: ScheduleRegistFormProps) {
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

  return (
    <>
      <S.Heading>
        {name}님의
        <br />
        <ToggleButton isChecked={isAvailable} toggle={toggle} />
        시간을 선택해주세요.
      </S.Heading>
      <S.ContentLayout>
        {isFetching ? (
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

      <S.ButtonWrapper>
        <Button type="submit">
          {isSubmitting ? <Spinner size="sm" /> : "일정 등록 완료"}
        </Button>
      </S.ButtonWrapper>
    </>
  );
}
