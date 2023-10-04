import { FormEvent, useRef, useState } from "react";
import MeetingInfoInputs from "@/components/MeetingInfoInputs";
import { MeetingFormRefType } from "@/types/Meeting";
import MeetingDateTimePicker from "@/components/MeetingDateTimePicker";

export default function MakeMeetingPage() {
  const [step, setStep] = useState(1);
  const [meetingInputForm, setMeetingInputForm] = useState({});

  const meetingInputRefs = useRef<MeetingFormRefType>({
    title: null,
    memberCnt: null,
    time: null,
  });

  const setDateValue = (date: Date) => {
    setMeetingInputForm((prev) => ({ ...prev, date }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const totalFormValue = {
      ...meetingInputForm,
      time: meetingInputRefs.current.time?.value,
    };
  };

  const navigateStep = (stepOffset: number) => {
    const { title, memberCnt } = meetingInputRefs.current;

    if (!title || !memberCnt) return;

    const meetingInputValue = {
      title: title.value,
      memberCnt: memberCnt.value,
    };

    setMeetingInputForm(meetingInputValue);
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
        return <MeetingDateTimePicker setDateValue={setDateValue} />;
    }
  }

  return <form onSubmit={handleSubmit}>{renderStepComponent(step)}</form>;
}
