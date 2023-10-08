import { useState } from "react";
import {
  MAX_SCROLL_Y,
  MIN_SCROLL_Y,
  TimeRange,
  TIME_ITEM_HEIGHT,
} from "utils/time";
import * as S from "./style";

export default function TimePicker() {
  const [scrollY, setScrollY] = useState(0);
  const [prevTouchY, setPrevTouchY] = useState(0);

  const scrollToVisibleArea = (_scrollY: number) => {
    if (_scrollY < 0) return MIN_SCROLL_Y;
    if (_scrollY > MAX_SCROLL_Y) return MAX_SCROLL_Y;

    const remainderFromScroll = _scrollY % TIME_ITEM_HEIGHT;

    if (remainderFromScroll < TIME_ITEM_HEIGHT % 2)
      return _scrollY - remainderFromScroll;

    return _scrollY + TIME_ITEM_HEIGHT - remainderFromScroll;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const currentTouchY = e.touches[0].pageY;
    setPrevTouchY(currentTouchY);

    if (!prevTouchY) return;

    const offsetY = prevTouchY - currentTouchY;

    setScrollY((prev) => prev + offsetY);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    setPrevTouchY(0);

    setScrollY((prev) => scrollToVisibleArea(prev));
  };

  return (
    <S.TimePickerContainer>
      <S.StartTimeWrapper scrollY={scrollY}>
        {TimeRange.map((time, idx) => (
          <S.Time
            key={idx}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            isActiveItem={idx === scrollY / TIME_ITEM_HEIGHT + 1}
          >
            {time}
          </S.Time>
        ))}
      </S.StartTimeWrapper>
    </S.TimePickerContainer>
  );
}
