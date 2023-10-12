import React, { useEffect, useState } from "react";
import {
  MIN_SCROLL_Y,
  scrollToVisibleArea,
  TIME_ITEM_HEIGHT,
} from "utils/timePicker";
import * as S from "./style";

interface TimeListContainerProps {
  range: string[];
  setSelectedTimeIdx: (idx: number) => void;
}

export default function TimeListContainer({
  range,
  setSelectedTimeIdx,
}: TimeListContainerProps) {
  const [isScrollStart, setIsScrollStart] = useState(false);
  const [scrollY, setScrollY] = useState(MIN_SCROLL_Y);
  const [prevTouchY, setPrevTouchY] = useState(0);

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isScrollStart) setIsScrollStart(true);

    const currentTouchY = e.touches[0].pageY;
    setPrevTouchY(currentTouchY);

    if (!prevTouchY) return;

    const offsetY = prevTouchY - currentTouchY;

    setScrollY((prev) => prev + offsetY);
  };

  const handleTouchEnd = () => {
    setIsScrollStart(false);
    setPrevTouchY(0);
    setScrollY((prev) => scrollToVisibleArea(prev));
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsScrollStart(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isScrollStart) return;
    console.log("move", isScrollStart, e);

    const currentMouseY = e.pageY;
    setPrevTouchY(currentMouseY);

    if (!prevTouchY) return;

    const offsetY = prevTouchY - currentMouseY;

    setScrollY((prev) => prev + offsetY);
  };

  const handleMouseUp = () => {
    if (!isScrollStart) return;
    setIsScrollStart(false);
    setPrevTouchY(0);
    setScrollY((prev) => scrollToVisibleArea(prev));
  };

  useEffect(() => {
    if (isScrollStart) return;

    setSelectedTimeIdx(scrollY / TIME_ITEM_HEIGHT + 1);
  }, [isScrollStart]);

  return (
    <S.TimeListContainer
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <S.TimeList>
        {range.map((time, idx) => (
          <S.TimeItem
            key={idx}
            scrollY={scrollY}
            isActiveItem={idx === scrollY / TIME_ITEM_HEIGHT + 1}
          >
            {time}
          </S.TimeItem>
        ))}
      </S.TimeList>
    </S.TimeListContainer>
  );
}
