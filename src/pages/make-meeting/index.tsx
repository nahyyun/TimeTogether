import { FormEvent, useRef, useState } from "react";
import MeetingInfoInputs from "@/components/MeetingInfoInputs";
import { MeetingInputRefs } from "@/types/meeting";
import MeetingDateTimePicker from "@/components/MeetingDateTimePicker";
import { selectedTimeInfo } from "@/types/timeInfo";
import {
  meetingFormDefaultValue,
  meetingInputRefsDefaultValue,
} from "@/constants/stateDefaultValue";

export default function MakeMeetingPage() {
  const [step, setStep] = useState(1);
  const [meetingForm, setMeetingForm] = useState(meetingFormDefaultValue);

  const meetingInputRefs = useRef<MeetingInputRefs>(
    meetingInputRefsDefaultValue
  );

  const setDateValue = (date: Date) => {
    setMeetingForm((prev) => ({ ...prev, date }));
  };

  const setTimeValue = (time: selectedTimeInfo) => {
    setMeetingForm((prev) => ({ ...prev, time }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  const navigateStep = (stepOffset: number) => {
    const { title, memberCnt } = meetingInputRefs.current;

    if (!title || !memberCnt) return;

    const firstStepInputValue = {
      title: title.value,
      memberCnt: memberCnt.value,
    };

    setMeetingForm((prev) => ({ ...prev, ...firstStepInputValue }));
    setStep((prevStep) => prevStep + stepOffset);
  };

  function renderStepComponent(step: number) {
    switch (step) {
      case 1:
        return (
          <MeetingInfoInputs
            ref={meetingInputRefs}
            navigateStep={navigateStep}
          />
        );

      case 2:
        return (
          <MeetingDateTimePicker
            setDateValue={setDateValue}
            setTimeValue={setTimeValue}
          />
        );
    }
  }

  return <form onSubmit={handleSubmit}>{renderStepComponent(step)}</form>;
}
