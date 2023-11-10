import { useRef, useState } from "react";
import { Meeting } from "@/types/meeting";
import Button from "../Common/Button";
import DragSelector from "../DragSelector";
import ToggleButton from "../ToggleButton";
import ScheduleTable from "../ScheduleTable";
import * as S from "./style";

interface ScheduleRegistFormProps {
  name: string;
  meetingInfo: Meeting;
  setScheduleTime: (schedule: HTMLElement[]) => void;
}

export interface dragSelectionRefs {
  dragContainerRef: HTMLDivElement | null;
  selectableTargetsRefs: HTMLElement[];
}

export default function ScheduleRegistForm({
  name,
  meetingInfo,
  setScheduleTime,
}: ScheduleRegistFormProps) {
  const [isAvailable, setIsAvailable] = useState(true);

  const dragSelectionRefs = useRef<dragSelectionRefs>({
    dragContainerRef: null,
    selectableTargetsRefs: [],
  });

  const toggle = (status: boolean) => {
    setIsAvailable(status);
  };

  return (
    <>
      <h3>
        {name}님의
        <br />
        <ToggleButton isChecked={isAvailable} toggle={toggle} />
        시간을 선택해주세요.
      </h3>
      <ScheduleTable meetingInfo={meetingInfo} ref={dragSelectionRefs}>
        <DragSelector
          dragSelectionRefs={dragSelectionRefs.current}
          onSelect={setScheduleTime}
        />
      </ScheduleTable>
      <S.ButtonWrapper>
        <Button type="submit">일정 등록 완료</Button>
      </S.ButtonWrapper>
    </>
  );
}
