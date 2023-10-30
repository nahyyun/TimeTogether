import Button from "@/components/Common/Button";
import InputWithLabel from "@/components/Common/InputWithLabel";
import {
  Fieldset,
  MeetingInfoInputsContainer as NameInputWrapper,
} from "@/components/MeetingInfoInputs/style";
import ScheduleRegistForm from "@/components/ScheduleRegistForm";
import { Form } from "@/pages/make-meeting/style";
import { getMeetingInfo } from "@/services/meeting";
import { Meeting } from "@/types/meeting";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
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
  const [scheduleForm, setScheduleForm] = useState({ name: "", schedule: [] });

  const nameInputRef = useRef<{ name: HTMLInputElement | null }>({
    name: null,
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  const goToNextStep = () => {
    const { name } = nameInputRef.current;

    if (!name) return;

    setScheduleForm((prev) => ({ ...prev, name: name.value }));
    setStep((prevStep) => prevStep + 1);
  };

  function renderStepComponent(step: number) {
    switch (step) {
      case 2:
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

      case 1:
        return (
          <ScheduleRegistForm
            name={scheduleForm.name}
            meetingInfo={meetingInfo}
          />
        );
    }
  }

  return <Form onSubmit={handleSubmit}>{renderStepComponent(step)}</Form>;
}
