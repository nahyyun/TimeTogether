import { useRef, useState } from "react";
import { Meeting } from "@/types/meeting";
import Button from "../Common/Button";
import DragSelector from "../DragSelector";
import ToggleButton from "../ToggleButton";
import ScheduleTable from "../ScheduleTable";

interface ScheduleRegistFormProps {
  name: string;
  meetingInfo: Meeting;
}

export interface dragSelectionRefs {
  dragContainerRef: HTMLDivElement | null;
  selectableTargetsRefs: HTMLElement[];
}

export default function ScheduleRegistForm({
  name,
  meetingInfo,
}: ScheduleRegistFormProps) {
  const [isAvailable, setIsAvailable] = useState(true);
  const [selected, setSelected] = useState<HTMLElement[]>([]);

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
      <ScheduleTable
        isAvailable={isAvailable}
        meetingInfo={meetingInfo}
        ref={dragSelectionRefs}
        selected={selected}
      >
        <DragSelector
          dragSelectionRefs={dragSelectionRefs.current}
          setSelected={setSelected}
        />
      </ScheduleTable>

      <Button>일정 등록 완료</Button>
    </>
  );
}
