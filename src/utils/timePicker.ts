export const TimeRange = Array.from({ length: 48 }, (_, hour: number) => {
  const hourFormat = String(Math.floor(hour * 0.5)).padStart(2, "0");
  const minuteFormat = String((hour * 30) % 60).padStart(2, "0");

  return `${hourFormat}:${minuteFormat}`;
});

export const ITEM_CNT_PER_SCROLL = 3;
const ITEM_CNT_OF_LAST_SCROLL_PAGE = 2;
export const TIME_ITEM_HEIGHT = 40;
const SCROLLED_ITEM_CNT_BEFORE_LAST_SCROLL_PAGE =
  TimeRange.length - ITEM_CNT_OF_LAST_SCROLL_PAGE;

export const MIN_SCROLL_Y = -TIME_ITEM_HEIGHT;
export const MAX_SCROLL_Y =
  TIME_ITEM_HEIGHT * SCROLLED_ITEM_CNT_BEFORE_LAST_SCROLL_PAGE;

export const scrollToVisibleArea = (scrollY: number) => {
  if (scrollY < MIN_SCROLL_Y) return MIN_SCROLL_Y;
  if (scrollY > MAX_SCROLL_Y) return MAX_SCROLL_Y;

  const remainderFromScroll = scrollY % TIME_ITEM_HEIGHT;

  if (remainderFromScroll < TIME_ITEM_HEIGHT % 2)
    return scrollY - remainderFromScroll;

  return scrollY + TIME_ITEM_HEIGHT - remainderFromScroll;
};

export const calcMiddleItemIdxFromScollY = (scrollY: number) => 
   scrollY / TIME_ITEM_HEIGHT + Math.floor(ITEM_CNT_PER_SCROLL / 2);
;
