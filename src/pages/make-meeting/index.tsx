import { FormEvent, useRef, useState } from "react";
import MeetingInfoInput from "@/components/MeetingInfoInput";
import { MeetingFormRefType } from "@/types/Meeting";
import Input from "@/components/Common/Input";

export default function MakeMeetingPage() {
  const [step, setStep] = useState(1);
  const [meetingInputForm, setMeetingInputForm] = useState({});

  const meetingInputRefs = useRef<MeetingFormRefType>({
    title: null,
    memberCnt: null,
    date: null,
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const totalFormValue = {
      ...meetingInputForm,
      date: meetingInputRefs.current.date?.value,
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
          <MeetingInfoInput
            ref={meetingInputRefs}
            navigateStep={navigateStep}
          />
        );

      case 2:
        return (
          <Input
            id="date"
            label="약속날짜를 지정해주세요."
            type="text"
            required
            ref={meetingInputRefs}
          ></Input>
        );
    }
  }

  return <form onSubmit={handleSubmit}>{renderStepComponent(step)}</form>;
}
