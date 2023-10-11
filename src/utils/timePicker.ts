export const TimeRange = Array.from({ length: 48 }, (_, hour: number) => {
  const hourFormat = String(Math.floor(hour * 0.5)).padStart(2, "0");
  const minuteFormat = String((hour * 30) % 60).padStart(2, "0");

  return `${hourFormat}:${minuteFormat}`;
});

const ITEM_CNT_OF_LAST_SCROLL_PAGE = 2;
export const TIME_ITEM_HEIGHT = 40;
const SCROLLED_ITEM_CNT_BEFORE_LAST_SCROLL_PAGE =
  TimeRange.length - ITEM_CNT_OF_LAST_SCROLL_PAGE;

export const MIN_SCROLL_Y = -TIME_ITEM_HEIGHT;
export const MAX_SCROLL_Y =
  TIME_ITEM_HEIGHT * SCROLLED_ITEM_CNT_BEFORE_LAST_SCROLL_PAGE;

export const scrollToVisibleArea = (_scrollY: number) => {
  if (_scrollY < MIN_SCROLL_Y) return MIN_SCROLL_Y;
  if (_scrollY > MAX_SCROLL_Y) return MAX_SCROLL_Y;

  const remainderFromScroll = _scrollY % TIME_ITEM_HEIGHT;

  if (remainderFromScroll < TIME_ITEM_HEIGHT % 2)
    return _scrollY - remainderFromScroll;

  return _scrollY + TIME_ITEM_HEIGHT - remainderFromScroll;
};
