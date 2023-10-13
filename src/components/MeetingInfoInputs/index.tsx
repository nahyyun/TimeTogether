import { MeetingInputRefs } from "@/types/meeting";
import { forwardRef } from "react";
import Button from "../Common/Button";
import Input from "../Common/Input";

interface MeetingInfoInputsProps {
  navigateStep: (stepOffset: number) => void;
}

const MeetingInfoInputs = forwardRef<MeetingInputRefs, MeetingInfoInputsProps>(
  function MeetingInfoInputs({ navigateStep }: MeetingInfoInputsProps, ref) {
    return (
      <>
        <h3>어떤 약속인가요?</h3>
        <Input
          id="title"
          label="약속명을 입력해주세요."
          type="text"
          placeholder="해커톤 뒷풀이"
          ref={ref}
        />

        <h3>몇명이서 모이나요?</h3>
        <Input
          id="memberCnt"
          label="모임 인원 수를 입력해주세요."
          type="number"
          placeholder="5"
          min={1}
          max={20}
          ref={ref}
        />

        <Button onClick={() => navigateStep(1)}>다음</Button>
      </>
    );
  }
);

export default MeetingInfoInputs;
