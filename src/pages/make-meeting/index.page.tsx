import { FormEvent, useCallback, useContext, useRef, useState } from "react";
import MeetingInfoInputs from "@/components/MeetingInfoInputs";
import { MeetingInputRefs, setTimeValueFnArg } from "@/types/meeting";
import MeetingDateTimePicker from "@/components/MeetingDateTimePicker";
import {
  meetingFormDefaultValue,
  meetingInputRefsDefaultValue,
} from "@/constants/stateDefaultValue";
import { isFirstStepInputsValid, isValidTimeRange } from "@/utils/validate";
import { useCreateMeeting } from "@/hooks/queries/meeting";
import { formatDateToString } from "@/utils/date";
import { SnackbarContext } from "@/contexts/SnackbarContext";
import { ERROR_MESSAGE } from "@/constants/message";
import { Form } from "@/styles/commonStyle";

export default function MakeMeetingPage() {
  const [step, setStep] = useState(1);
  const [meetingForm, setMeetingForm] = useState(meetingFormDefaultValue);

  const { mutate: createMeeting, isLoading: isSubmitting } = useCreateMeeting();

  const meetingInputRefs = useRef<MeetingInputRefs>(
    meetingInputRefsDefaultValue
  );

  const { openSnackbar } = useContext(SnackbarContext);

  const setDateValue = useCallback(
    (date: Date) => setMeetingForm((prev) => ({ ...prev, date })),
    []
  );

  const setTimeValue = useCallback(
    ({ key, info }: setTimeValueFnArg) =>
      setMeetingForm((prev) => ({
        ...prev,
        timeRange: { ...prev.timeRange, [key]: info },
      })),
    []
  );

  const handleSubmit = (e: FormEvent) => {
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

  const goToPrevStep = useCallback(() => {
    setStep((prevStep) => prevStep - 1);
  }, []);

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
            date={meetingForm.date}
            setDateValue={setDateValue}
            setTimeValue={setTimeValue}
            goToPrevStep={goToPrevStep}
            isSubmitting={isSubmitting}
          />
        );
    }
  };

  return <Form onSubmit={handleSubmit}>{renderStepComponent(step)}</Form>;
}
