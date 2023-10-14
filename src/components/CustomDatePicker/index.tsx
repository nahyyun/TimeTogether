import { useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import CustomHeader from "./CustomHeader";
import "react-datepicker/dist/react-datepicker.css";
import ko from "date-fns/locale/ko";
import * as S from "./style";

registerLocale("ko", ko);

interface CustomDatePickerProps {
  setDateValue: (date: Date) => void;
}
export default function CustomDatePicker({
  setDateValue,
}: CustomDatePickerProps) {
  const [startDate, setStartDate] = useState(new Date());

  const onChangeHandler = (date: Date) => {
    setStartDate(date);
    setDateValue(date);
  };

  return (
    <S.DatePickerWrapper>
      <DatePicker
        selected={startDate}
        onChange={onChangeHandler}
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





