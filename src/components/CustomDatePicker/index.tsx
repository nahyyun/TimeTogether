import DatePicker, { registerLocale } from "react-datepicker";
import CustomHeader from "./CustomHeader";
import "react-datepicker/dist/react-datepicker.css";
import ko from "date-fns/locale/ko";
import * as S from "./style";

registerLocale("ko", ko);

interface CustomDatePickerProps {
  date: Date;
  setDateValue: (date: Date) => void;
}

export default function CustomDatePicker({
  date,
  setDateValue,
}: CustomDatePickerProps) {
  return (
    <S.DatePickerWrapper>
      <DatePicker
        selected={date}
        onChange={(date: Date) => setDateValue(date)}
        locale="ko"
        inline
        dateFormatCalendar="yyyy년 MM월"
        dateFormat="yyyy년 MM월"
        minDate={new Date()}
        renderCustomHeader={(props) => <CustomHeader {...props} />}
      />
    </S.DatePickerWrapper>
  );
}
