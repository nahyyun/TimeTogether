import { FormEvent, useRef, useState } from "react";
import MeetingInfoInputs from "@/components/MeetingInfoInputs";
import { MeetingFormRefType } from "@/types/Meeting";
import MeetingDateTimePicker from "@/components/MeetingDateTimePicker";

export default function MakeMeetingPage() {
  const [step, setStep] = useState(1);
  const [meetingForm, setMeetingForm] = useState({
    title: "",
    memberCnt: "",
    date: new Date(),
    time: ["", ""],
  });

  const meetingInputRefs = useRef<MeetingFormRefType>({
    title: null,
    memberCnt: null,
  });

  const setDateValue = (date: Date) => {
    setMeetingForm((prev) => ({ ...prev, date }));
  };

  const setTimeValue = (time: [string, string]) => {
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
      case 2:
        return (
          <MeetingInfoInputs
            ref={meetingInputRefs}
            navigateStep={navigateStep}
          />
        );

      case 1:
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
