export const TimeRange = Array.from({ length: 48 }, (_, hour: number) => {
  const hourFormat = String(Math.floor(hour * 0.5)).padStart(2, "0");
  const minuteFormat = String((hour * 30) % 60).padStart(2, "0");

  return `${hourFormat}:${minuteFormat}`;
});

const VISIBLE_ITEM_CNT = 3;
export const TIME_ITEM_HEIGHT = 40;
const SCROLLED_ITEM_CNT = TimeRange.length - VISIBLE_ITEM_CNT;

export const MIN_SCROLL_Y = 0;
export const MAX_SCROLL_Y = TIME_ITEM_HEIGHT * SCROLLED_ITEM_CNT;

export const scrollToVisibleArea = (_scrollY: number) => {
  if (_scrollY < 0) return MIN_SCROLL_Y;
  if (_scrollY > MAX_SCROLL_Y) return MAX_SCROLL_Y;

  const remainderFromScroll = _scrollY % TIME_ITEM_HEIGHT;

  if (remainderFromScroll < TIME_ITEM_HEIGHT % 2)
    return _scrollY - remainderFromScroll;

  return _scrollY + TIME_ITEM_HEIGHT - remainderFromScroll;
};
