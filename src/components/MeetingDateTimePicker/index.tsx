import Button from "../Common/Button";
import CustomDatePicker from "../CustomDatePicker";

interface MeetingDateTimePickerProps {
  setDateValue: (date: Date) => void;
}

export default function MeetingDateTimePicker({
  setDateValue,
}: MeetingDateTimePickerProps) {
  return (
    <>
      <h3>언제 모일 예정인가요?</h3>

      <span>모임 날짜를 지정해주세요.</span>
      <CustomDatePicker setDateValue={setDateValue} />

      <span>모임 시간을 지정해주세요.</span>

      <Button type="submit">일정 생성 완료</Button>
    </>
  );
}
