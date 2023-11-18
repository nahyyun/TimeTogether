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
import { useCreateMeeting } from "@/hooks/queries";
import { formatDateToString } from "@/utils/date";
import * as S from "./style";

export default function MakeMeetingPage() {
  const [step, setStep] = useState(1);
  const [meetingForm, setMeetingForm] = useState(meetingFormDefaultValue);

  const { mutate: createMeeting } = useCreateMeeting();

  const meetingInputRefs = useRef<MeetingInputRefs>(
    meetingInputRefsDefaultValue
  );

  const setDateValue = (date: Date) => {
    setMeetingForm((prev) => ({ ...prev, date }));
  };

  const setTimeValue = (time: selectedTimeInfo) => {
    setMeetingForm((prev) => ({ ...prev, timeRange: time }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const {
      startTime: { idx: startIdx },
      endTime: { idx: endIdx },
    } = meetingForm.timeRange;

    if (!isTimeValid(startIdx, endIdx)) return;

    const { startTime, endTime } = meetingForm.timeRange;

    createMeeting({
      ...meetingForm,
      date: formatDateToString(meetingForm.date),
      timeRange: [startTime.value, endTime.value],
      candidates: [],
    });
  };

  const goToPrevStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const goToNextStep = () => {
    const { title, memberCount } = meetingInputRefs.current;

    if (
      !title ||
      !memberCount ||
      !isFirstStepInputsValid(title.value, Number(memberCount.value))
    )
      return;

    const firstStepInputValue = {
      title: title.value,
      memberCount: Number(memberCount.value),
    };

    setMeetingForm((prev) => ({ ...prev, ...firstStepInputValue }));
    setStep((prevStep) => prevStep + 1);
  };

  function renderStepComponent(step: number) {
    switch (step) {
      case 1:
        return (
          <MeetingInfoInputs
            ref={meetingInputRefs}
            goToNextStep={goToNextStep}
          />
        );

      case 2:
        return (
          <MeetingDateTimePicker
            setDateValue={setDateValue}
            setTimeValue={setTimeValue}
            goToPrevStep={goToPrevStep}
          />
        );
    }
  }

  return <S.Form onSubmit={handleSubmit}>{renderStepComponent(step)}</S.Form>;
}
