import { useState } from "react";
import ScheduleTable from "../ScheduleTable";
import ToggleButton from "../ToggleButton";

interface ScheduleRegistFormProps {
  name: string;
  timeRange: string[];
}

export default function ScheduleRegistForm({
  name,
  timeRange,
}: ScheduleRegistFormProps) {
  const [isAvailable, setIsAvailable] = useState(true);

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
      <ScheduleTable isAvailable={isAvailable} scheduleRange={timeRange} />
    </>
  );
}
