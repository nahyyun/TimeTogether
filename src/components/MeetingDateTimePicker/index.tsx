import { Fieldset } from "@/styles/commonStyle";
import { selectedTimeInfo } from "@/types/timeInfo";
import dynamic from "next/dynamic";
import Button from "../Common/Button";
import Spinner from "../Common/Spinner";
import TimePicker from "../TimePicker";
import * as S from "./style";

interface MeetingDateTimePickerProps {
  setDateValue: (date: Date) => void;
  setTimeValue: (time: selectedTimeInfo) => void;
  goToPrevStep: () => void;
  isSubmitting: boolean;
}

export default function MeetingDateTimePicker({
  setDateValue,
  setTimeValue,
  goToPrevStep,
  isSubmitting,
}: MeetingDateTimePickerProps) {
  const CustomDatePicker = dynamic(
    () => import("@/components/CustomDatePicker")
  );

  return (
    <S.MeetingDateTimePickerWrapper>
      <Fieldset>
        <h2>언제 모일 예정인가요?</h2>
        <div>
          <span>모임 날짜를 지정해주세요.</span>
          <CustomDatePicker setDateValue={setDateValue} />
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
