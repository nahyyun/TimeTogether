import Button from "@/components/Common/Button";
import InputWithLabel from "@/components/Common/InputWithLabel";
import { MeetingInfoInputsContainer as NameInputWrapper } from "@/components/MeetingInfoInputs/style";
import { Meeting, ScheduleForm } from "@/types/meeting";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { ParsedUrlQuery } from "querystring";
import { FormEvent, useContext, useEffect, useRef, useState } from "react";
import {
  useCreateSchedule,
  useGetPersonalSchedule,
  useUpdatePersonalSchedule,
} from "@/hooks/queries/schedule";
import { getMeetingInfo } from "@/backend/services/meeting";
import { SnackbarContext } from "@/contexts/SnackbarContext";
import { ERROR_MESSAGE } from "@/constants/message";
import { isDuplicatedName, isExceededMemberCnt } from "@/utils/validate";
import { Fieldset, Form } from "@/styles/commonStyle";
import ScheduleRegistContainer from "@/components/ScheduleRegistContainer";

interface PageProps {
  meetingInfo: Meeting;
}

interface Params extends ParsedUrlQuery {
  id: string;
}

export const getServerSideProps: GetServerSideProps<PageProps, Params> = async (
  context
) => {
  const meetingId = context.params?.id || "";

  const { data, error } = await getMeetingInfo(meetingId);

  if (error) throw error;

  if (!data)
    return {
      notFound: true,
    };

  return { props: { meetingInfo: data } };
};

export default function ScheduleLoginPage({
  meetingInfo,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [step, setStep] = useState(1);
  const [localStorageUserName, setLocalStorageUserName] = useState("");

  const scheduleForm = useRef<ScheduleForm>({ name: "", schedule: [] });

  const { mutate: createSchedule, isLoading: isCreatingSchedule } =
    useCreateSchedule();

  const { mutate: updateSchedule, isLoading: isUpdatingSchedule } =
    useUpdatePersonalSchedule();

  const { data: personalScheduleData, isFetching } = useGetPersonalSchedule(
    meetingInfo.id,
    scheduleForm.current.name || localStorageUserName
  );

  const { openSnackbar } = useContext(SnackbarContext);

  const setScheduleTime = (schedule: string[]) => {
    scheduleForm.current = {
      ...scheduleForm.current,
      schedule,
    };
  };

  const nameInputRef = useRef<{ name: HTMLInputElement | null }>({
    name: null,
  });

  const isExistingMember = personalScheduleData?.schedule;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (scheduleForm.current.schedule.length == 0)
      return openSnackbar(ERROR_MESSAGE.INVALID_SCHEDULE_TIME);

    const meetingId = meetingInfo.id;

    !isExistingMember
      ? createSchedule({
          meetingId,
          scheduleForm: scheduleForm.current,
        })
      : updateSchedule({
          meetingId,
          scheduleForm: {
            name: localStorageUserName || scheduleForm.current.name,
            schedule: scheduleForm.current.schedule,
          },
        });
  };

  const goToNextStep = () => {
    const name = nameInputRef.current.name?.value;

    if (!name) return openSnackbar(ERROR_MESSAGE.INVALID_INPUT);

    if (
      meetingInfo.memberCount &&
      !isDuplicatedName(
        meetingInfo.members.map((member) => member.name),
        name
      ) &&
      isExceededMemberCnt(meetingInfo.memberCount, meetingInfo.members.length)
    )
      return openSnackbar(ERROR_MESSAGE.EXCEEDED_MEMBER_CNT);

    scheduleForm.current = { ...scheduleForm.current, name };
    setStep((prevStep) => prevStep + 1);
  };

  function renderStepComponent(step: number) {
    switch (step) {
      case 1:
        return (
          <NameInputWrapper>
            <Fieldset>
              <h2>이름을 입력해주세요.</h2>
              <InputWithLabel
                id="name"
                label="10자 이하로 이름을 입력해주세요."
                type="text"
                placeholder="홍길동"
                required
                minLength={1}
                maxLength={10}
                ref={nameInputRef}
              />
            </Fieldset>
            <Button type="button" onClick={goToNextStep} size="full-width">
              다음
            </Button>
          </NameInputWrapper>
        );

      case 2: {
        return (
          <ScheduleRegistContainer
            name={scheduleForm.current.name || localStorageUserName}
            meetingInfo={meetingInfo}
            setScheduleTime={setScheduleTime}
            mappedTrueToPersonalTimeSlots={personalScheduleData?.schedule || {}}
            isFetching={isFetching}
            isSubmitting={isCreatingSchedule || isUpdatingSchedule}
          />
        );
      }
    }
  }

  const LAST_STEP = 2;

  useEffect(() => {
    const name = localStorage.getItem("userName") || "";

    setLocalStorageUserName(name);
  }, []);

  useEffect(() => {
    if (step === LAST_STEP)
      localStorage.setItem("userName", scheduleForm.current.name);
  }, [step]);

  return (
    <Form onSubmit={handleSubmit}>
      {!localStorageUserName ||
      (localStorageUserName && !isFetching && !isExistingMember)
        ? renderStepComponent(step)
        : renderStepComponent(LAST_STEP)}
    </Form>
  );
}