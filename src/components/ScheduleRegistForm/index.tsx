import { Meeting } from "@/types/meeting";
import { useState } from "react";
import ScheduleTable from "../ScheduleTable";
import ToggleButton from "../ToggleButton";

interface ScheduleRegistFormProps {
  name: string;
  meetingInfo: Meeting;
}

export default function ScheduleRegistForm({
  name,
  meetingInfo,
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
      <ScheduleTable isAvailable={isAvailable} meetingInfo={meetingInfo} />
    </>
  );
}
