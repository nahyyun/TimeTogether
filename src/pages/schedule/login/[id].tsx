import Button from "@/components/Common/Button";
import InputWithLabel from "@/components/Common/InputWithLabel";
import {
  Fieldset,
  MeetingInfoInputsContainer as NameInputWrapper,
} from "@/components/MeetingInfoInputs/style";
import { Form } from "@/pages/make-meeting/style";
import { Meeting, ScheduleForm } from "@/types/meeting";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import dynamic from "next/dynamic";
import { ParsedUrlQuery } from "querystring";
import { FormEvent, useEffect, useRef, useState } from "react";
import {
  useCreateSchedule,
  useGetPersonalSchedule,
  useUpdatePersonalSchedule,
} from "@/hooks/queries/schedule";
import { getMeetingInfo } from "@/backend/services/meeting";

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

  const { mutate: createSchedule } = useCreateSchedule();
  const { mutate: updateSchedule } = useUpdatePersonalSchedule();

  const { data: personalScheduleData } = useGetPersonalSchedule(
    meetingInfo.id,
    localStorageUserName
  );

  const setScheduleTime = (schedule: string[]) => {
    scheduleForm.current = {
      ...scheduleForm.current,
      schedule,
    };
  };

  const nameInputRef = useRef<{ name: HTMLInputElement | null }>({
    name: null,
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const meetingId = meetingInfo.id;

    !localStorageUserName
      ? createSchedule({
          meetingId,
          scheduleForm: scheduleForm.current,
        })
      : updateSchedule({
          meetingId,
          scheduleForm: {
            name: localStorageUserName,
            schedule: scheduleForm.current.schedule,
          },
        });
  };

  const goToNextStep = () => {
    const { name } = nameInputRef.current;

    if (!name) return;

    scheduleForm.current = { ...scheduleForm.current, name: name.value };
    setStep((prevStep) => prevStep + 1);
  };

  const ScheduleRegistForm = dynamic(
    () => import("@/components/ScheduleRegistForm"),
    { ssr: false }
  );

  function renderStepComponent(step: number) {
    switch (step) {
      case 1:
        return (
          <NameInputWrapper>
            <Fieldset>
              <h2>본인의 이름을 입력해주세요.</h2>
              <InputWithLabel
                id="name"
                label="이름을 입력해주세요."
                type="text"
                placeholder="홍길동"
                required
                ref={nameInputRef}
              />
            </Fieldset>
            <Button onClick={goToNextStep}>다음</Button>
          </NameInputWrapper>
        );

      case 2:
        return (
          <ScheduleRegistForm
            name={scheduleForm.current.name || localStorageUserName}
            meetingInfo={meetingInfo}
            setScheduleTime={setScheduleTime}
          />
        );
    }
  }

  useEffect(() => {
    const name = JSON.parse(localStorage.getItem("userName") || "null");
    setLocalStorageUserName(name);
  }, []);

  return (
    <Form onSubmit={handleSubmit}>
      {!localStorageUserName ? (
        renderStepComponent(step)
      ) : (
        <ScheduleRegistForm
          name={scheduleForm.current.name || localStorageUserName}
          meetingInfo={meetingInfo}
          setScheduleTime={setScheduleTime}
          mappedTrueToPersonalTimeSlots={personalScheduleData?.schedule}
        />
      )}
    </Form>
  );
}


