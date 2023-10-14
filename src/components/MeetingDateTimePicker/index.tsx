import { selectedTimeInfo } from "@/types/timeInfo";
import Button from "../Common/Button";
import CustomDatePicker from "../CustomDatePicker";
import { Fieldset } from "../MeetingInfoInputs/style";
import TimePicker from "../TimePicker";
import * as S from "./style";

interface MeetingDateTimePickerProps {
  setDateValue: (date: Date) => void;
  setTimeValue: (time: selectedTimeInfo) => void;
  goToPrevStep: () => void;
}

export default function MeetingDateTimePicker({
  setDateValue,
  setTimeValue,
  goToPrevStep,
}: MeetingDateTimePickerProps) {
  return (
    <S.MeetingDateTimePickerWrapper>
      <Fieldset>
        <h3>언제 모일 예정인가요?</h3>
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
        <Button type="button" onClick={goToPrevStep}>
          이전 단계
        </Button>
        <Button type="submit">일정 생성 완료</Button>
      </S.ButtonWrapper>
    </S.MeetingDateTimePickerWrapper>
  );
}
