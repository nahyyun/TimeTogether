import { Fieldset } from "@/styles/commonStyle";
import { setTimeValueFnArg } from "@/types/meeting";
import dynamic from "next/dynamic";
import { useCallback } from "react";
import Button from "../Common/Button";
import Spinner from "../Common/Spinner";
import TimePicker from "../TimePicker";
import * as S from "./style";

interface MeetingDateTimePickerProps {
  setDateValue: (date: Date) => void;
  setTimeValue: ({ key, info }: setTimeValueFnArg) => void;
  goToPrevStep: () => void;
  isSubmitting: boolean;
}

export default function MeetingDateTimePicker({
  setDateValue,
  setTimeValue,
  goToPrevStep,
  isSubmitting,
}: MeetingDateTimePickerProps) {
  const CustomDatePicker = useCallback(
    dynamic(() => import("@/components/CustomDatePicker"), {
      loading: () => <Spinner />,
    }),
    []
  );

  return (
    <S.MeetingDateTimePickerWrapper>
      <Fieldset>
        <h2>언제 모일 예정인가요?</h2>
        <div>
          <span>모임 날짜를 지정해주세요.</span>
          <S.Layout>
            <CustomDatePicker setDateValue={setDateValue} />
          </S.Layout>
        </div>
      </Fieldset>

      <Fieldset>
        <div>
          <span>약속 시간대를 지정해주세요.</span>
          <TimePicker setTimeValue={setTimeValue} />
        </div>
      </Fieldset>

      <S.ButtonWrapper>
        <Button type="button" buttonstyle="secondary" onClick={goToPrevStep}>
          이전 단계
        </Button>
        <Button type="submit">
          {isSubmitting ? <Spinner size="sm" /> : "일정 생성 완료"}
        </Button>
      </S.ButtonWrapper>
    </S.MeetingDateTimePickerWrapper>
  );
}
