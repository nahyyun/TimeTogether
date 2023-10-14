import { forwardRef } from "react";
import { MeetingInputRefs } from "@/types/meeting";
import Button from "../Common/Button";
import InputWithLabel from "../Common/InputWithLabel";
import * as S from "./style";

interface MeetingInfoInputsProps {
  goToNextStep: () => void;
}

const MeetingInfoInputs = forwardRef<MeetingInputRefs, MeetingInfoInputsProps>(
  function MeetingInfoInputs({ goToNextStep }: MeetingInfoInputsProps, ref) {
    return (
      <S.MeetingInfoInputsContainer>
        <S.Fieldset>
          <h2>어떤 약속인가요?</h2>
          <InputWithLabel
            id="title"
            label="약속명을 입력해주세요."
            type="text"
            placeholder="해커톤 뒷풀이"
            required
            ref={ref}
          />
        </S.Fieldset>

        <S.Fieldset>
          <h2>몇명이서 모이나요?</h2>
          <InputWithLabel
            id="memberCnt"
            label="모임 인원 수를 입력해주세요."
            type="number"
            placeholder="5"
            min={1}
            max={20}
            required
            ref={ref}
          />
        </S.Fieldset>

        <Button onClick={goToNextStep}>다음</Button>
      </S.MeetingInfoInputsContainer>
    );
  }
);

export default MeetingInfoInputs;
