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
        type="button"
        size="square"
        buttonstyle="icon-only"
        onClick={decreaseMonth}
        disabled={prevMonthButtonDisabled}
        aria-label="이전 달로 전환하기"
      >
        <PrevArrowIcon />
      </Button>
      <S.MonthSpan>{date.getMonth() + 1}월</S.MonthSpan>
      <Button
        type="button"
        size="square"
        buttonstyle="icon-only"
        onClick={increaseMonth}
        disabled={nextMonthButtonDisabled}
        aria-label="다음 달로 전환하기"
      >
        <NextArrowIcon />
      </Button>
    </S.CustomHeaderWrapper>
  );
}
