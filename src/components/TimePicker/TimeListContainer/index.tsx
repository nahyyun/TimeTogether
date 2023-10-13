import { useEffect, useState } from "react";
import {
  calcMiddleItemIdxFromScollY,
  MIN_SCROLL_Y,
  scrollToVisibleArea,
} from "@/utils/timePicker";
import * as S from "./style";

interface TimeListContainerProps {
  range: string[];
  setSelectedTimeIdx: (idx: number, value: string) => void;
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

  const handleMouseDown = () => {
    setIsScrollStart(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isScrollStart) return;

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

    const selectedTimeIdx = calcMiddleItemIdxFromScollY(scrollY);

    setSelectedTimeIdx(selectedTimeIdx, range[selectedTimeIdx]);
  }, [isScrollStart]);

  return (
    <S.TimeList
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {range.map((time, idx) => (
        <S.TimeItem
          key={idx}
          scrollY={scrollY}
          isActiveItem={idx === calcMiddleItemIdxFromScollY(scrollY)}
        >
          {time}
        </S.TimeItem>
      ))}
    </S.TimeList>
  );
}
