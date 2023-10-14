import { FormEvent, useRef, useState } from "react";
import MeetingInfoInputs from "@/components/MeetingInfoInputs";
import { MeetingInputRefs } from "@/types/meeting";
import MeetingDateTimePicker from "@/components/MeetingDateTimePicker";
import { selectedTimeInfo } from "@/types/timeInfo";
import {
  meetingFormDefaultValue,
  meetingInputRefsDefaultValue,
} from "@/constants/stateDefaultValue";
import { isFirstStepInputsValid, isTimeValid } from "@/utils/validate";
import * as S from "./style";

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

    const {
      startTime: { idx: startIdx },
      endTime: { idx: endIdx },
    } = meetingForm.time;

    if (!isTimeValid(startIdx, endIdx)) return;
  };

  const goToprevStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const goToNextStep = () => {
    const { title, memberCnt } = meetingInputRefs.current;

    if (
      !title ||
      !memberCnt ||
      !isFirstStepInputsValid(title.value, Number(memberCnt.value))
    )
      return;

    const firstStepInputValue = {
      title: title.value,
      memberCnt: memberCnt.value,
    };

    setMeetingForm((prev) => ({ ...prev, ...firstStepInputValue }));
    setStep((prevStep) => prevStep + 1);
  };

  function renderStepComponent(step: number) {
    switch (step) {
      case 2:
        return (
          <MeetingInfoInputs
            ref={meetingInputRefs}
            goToNextStep={goToNextStep}
          />
        );

      case 1:
        return (
          <MeetingDateTimePicker
            setDateValue={setDateValue}
            setTimeValue={setTimeValue}
            goToPrevStep={goToprevStep}
          />
        );
    }
  }

  return <S.Form onSubmit={handleSubmit}>{renderStepComponent(step)}</S.Form>;
}
