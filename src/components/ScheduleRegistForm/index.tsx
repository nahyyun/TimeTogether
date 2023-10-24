import { useState } from "react";
import ToggleButton from "../ToggleButton";

interface ScheduleRegistFormProps {
  name: string;
}

export default function ScheduleRegistForm({ name }: ScheduleRegistFormProps) {
  const [isAvailable, setIsAvailable] = useState(true);

  const toggle = (status: boolean) => {
    setIsAvailable(status);
  };

  return (
    <>
      <ToggleButton isChecked={isAvailable} toggle={toggle} />
    </>
  );
}
