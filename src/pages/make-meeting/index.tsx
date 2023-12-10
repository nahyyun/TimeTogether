import { FormEvent, useContext, useRef, useState } from "react";
import MeetingInfoInputs from "@/components/MeetingInfoInputs";
import { MeetingInputRefs } from "@/types/meeting";
import MeetingDateTimePicker from "@/components/MeetingDateTimePicker";
import { selectedTimeInfo } from "@/types/timeInfo";
import {
  meetingFormDefaultValue,
  meetingInputRefsDefaultValue,
} from "@/constants/stateDefaultValue";
import { isFirstStepInputsValid, isValidTimeRange } from "@/utils/validate";
import { useCreateMeeting } from "@/hooks/queries/meeting";
import { formatDateToString } from "@/utils/date";
import { SnackbarContext } from "contexts/SnackbarContext";
import * as S from "./style";
import { ERROR_MESSAGE } from "@/constants/message";

export default function MakeMeetingPage() {
  const [step, setStep] = useState(1);
  const [meetingForm, setMeetingForm] = useState(meetingFormDefaultValue);

  const { mutate: createMeeting } = useCreateMeeting();

  const meetingInputRefs = useRef<MeetingInputRefs>(
    meetingInputRefsDefaultValue
  );

  const { openSnackbar } = useContext(SnackbarContext);

  const setDateValue = (date: Date) => {
    setMeetingForm((prev) => ({ ...prev, date }));
  };

  const setTimeValue = (time: selectedTimeInfo) => {
    setMeetingForm((prev) => ({ ...prev, timeRange: time }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const {
      startTime: { idx: startIdx, value: startTime },
      endTime: { idx: endIdx, value: endTime },
    } = meetingForm.timeRange;

    if (!isValidTimeRange(startIdx, endIdx))
      return openSnackbar(ERROR_MESSAGE.INVALID_TIME_RANGE);

    createMeeting({
      ...meetingForm,
      date: formatDateToString(meetingForm.date),
      timeRange: [startTime, endTime],
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
      return openSnackbar(ERROR_MESSAGE.INVALID_INPUT);

    const firstStepInputValue = {
      title: title.value,
      memberCount: Number(memberCount.value),
    };

    setMeetingForm((prev) => ({ ...prev, ...firstStepInputValue }));
    setStep((prevStep) => prevStep + 1);
  };

  const renderStepComponent = (step: number) => {
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
  };

  return <S.Form onSubmit={handleSubmit}>{renderStepComponent(step)}</S.Form>;
}
