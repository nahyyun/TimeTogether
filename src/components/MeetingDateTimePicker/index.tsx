import { MeetingFormRefType } from "@/types/Meeting";
import { forwardRef } from "react";
import Button from "../Common/Button";
import CustomDatePicker from "../CustomDatePicker";
import TimePicker from "../TimePicker";

interface MeetingDateTimePickerProps {
  setDateValue: (date: Date) => void;
}

const MeetingDateTimePicker = forwardRef<
  MeetingFormRefType,
  MeetingDateTimePickerProps
>(function MeetingDateTimePicker(
  { setDateValue }: MeetingDateTimePickerProps,
  ref
) {
  return (
    <>
      <h3>언제 모일 예정인가요?</h3>
      <span>모임 날짜를 지정해주세요.</span>
      <CustomDatePicker setDateValue={setDateValue} />

      <h3>약속 시간이 어떻게 되나요?</h3>
      <span>약속 시간대를 지정해주세요.</span>
      <TimePicker />

      <Button type="submit">일정 생성 완료</Button>
    </>
  );
});

export default MeetingDateTimePicker;
