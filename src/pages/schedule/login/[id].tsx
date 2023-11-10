import Button from "@/components/Common/Button";
import InputWithLabel from "@/components/Common/InputWithLabel";
import {
  Fieldset,
  MeetingInfoInputsContainer as NameInputWrapper,
} from "@/components/MeetingInfoInputs/style";
import { Form } from "@/pages/make-meeting/style";
import { getMeetingInfo } from "@/services/meeting";
import { Meeting } from "@/types/meeting";
import { extractTimeDataset } from "@/utils/time";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import dynamic from "next/dynamic";
import { ParsedUrlQuery } from "querystring";
import { FormEvent, useRef, useState } from "react";

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

  return { props: { meetingInfo: data[0] } };
};

export default function ScheduleLoginPage({
  meetingInfo,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [step, setStep] = useState(1);
  const scheduleForm = useRef<{
    name: string;
    schedule: string[];
  }>({ name: "", schedule: [] });

  const setScheduleTime = (schedule: string[]) => {
    scheduleForm.current = {
      ...scheduleForm.current,
      schedule: [...scheduleForm.current.schedule, ...schedule],
    };
  };

  const nameInputRef = useRef<{ name: HTMLInputElement | null }>({
    name: null,
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(scheduleForm);
  };

  const goToNextStep = () => {
    const { name } = nameInputRef.current;

    if (!name) return;

    scheduleForm.current = { ...scheduleForm.current, name: name.value };
    setStep((prevStep) => prevStep + 1);
  };

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
        const ScheduleRegistForm = dynamic(
          () => import("@/components/ScheduleRegistForm"),
          { ssr: false }
        );

        return (
          <ScheduleRegistForm
            name={scheduleForm.current.name}
            meetingInfo={meetingInfo}
            setScheduleTime={(elements) =>
              setScheduleTime(extractTimeDataset(elements))
            }
          />
        );
    }
  }

  return <Form onSubmit={handleSubmit}>{renderStepComponent(step)}</Form>;
}
