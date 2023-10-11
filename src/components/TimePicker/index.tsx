import { useState } from "react";
import {
  scrollToVisibleArea,
  TimeRange,
  TIME_ITEM_HEIGHT,
} from "utils/timePicker";
import * as S from "./style";

export default function TimePicker() {
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [prevTouchY, setPrevTouchY] = useState(0);

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

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsMouseDown(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isMouseDown) return;

    const currentMouseY = e.pageY;
    setPrevTouchY(currentMouseY);

    if (!prevTouchY) return;

    const offsetY = prevTouchY - currentMouseY;

    setScrollY((prev) => prev + offsetY);
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    setIsMouseDown(false);
    setPrevTouchY(0);
    setScrollY((prev) => scrollToVisibleArea(prev));
  };

  return (
    <S.TimePickerContainer
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <S.StartTimeWrapper>
        {TimeRange.map((time, idx) => (
          <S.Time
            key={idx}
            scrollY={scrollY}
            isActiveItem={idx === scrollY / TIME_ITEM_HEIGHT + 1}
          >
            {time}
          </S.Time>
        ))}
      </S.StartTimeWrapper>
    </S.TimePickerContainer>
  );
}
