import React, { FormEvent, useRef, useState } from "react";
import MeetingInfoInput from "@/components/MeetingInfoInput";
import { MeetingFormRefType } from "@/types/Meeting";

export default function MakeMeetingPage() {
  const [step, setStep] = useState(1);

  const meetingInputRefs = useRef<MeetingFormRefType>({
    title: null,
    memberCnt: null,
    date: null,
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  const navigateStep = (stepOffset: number) => {
    setStep((prev) => prev + stepOffset);
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
        return <></>;
    }
  }

  return <form onSubmit={handleSubmit}>{renderStepComponent(step)}</form>;
}
