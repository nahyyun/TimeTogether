import Button from "@/components/Common/Button";
import { NextArrowIcon, PrevArrowIcon } from "@/components/Icons";
import { ReactDatePickerCustomHeaderProps } from "react-datepicker";
import * as S from "./style";

export default function CustomHeader({
  date,
  decreaseMonth,
  increaseMonth,
  prevMonthButtonDisabled,
  nextMonthButtonDisabled,
}: ReactDatePickerCustomHeaderProps) {
  return (
    <S.CustomHeaderWrapper>
      <Button
        size="square"
        buttonstyle="icon-only"
        onClick={decreaseMonth}
        disabled={prevMonthButtonDisabled}
      >
        <PrevArrowIcon />
      </Button>
      <S.MonthSpan>{date.getMonth() + 1}월</S.MonthSpan>
      <Button
        size="square"
        buttonstyle="icon-only"
        onClick={increaseMonth}
        disabled={nextMonthButtonDisabled}
      >
        <NextArrowIcon />
      </Button>
    </S.CustomHeaderWrapper>
  );
}
