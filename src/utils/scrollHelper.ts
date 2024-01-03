import {
  ITEM_CNT_PER_SCROLL,
  MAX_SCROLL_Y,
  MIN_SCROLL_Y,
  TIME_ITEM_HEIGHT,
} from "@/constants/scroll";

export const scrollToVisibleArea = (scrollY: number) => {
  if (scrollY <= MIN_SCROLL_Y) return MIN_SCROLL_Y;
  if (scrollY >= MAX_SCROLL_Y) return MAX_SCROLL_Y;

  const scrollOffset = scrollY % TIME_ITEM_HEIGHT;

  if (scrollOffset < TIME_ITEM_HEIGHT / 2) return scrollY - scrollOffset;

  return scrollY + TIME_ITEM_HEIGHT - scrollOffset;
};

export const calcMiddleItemIdxFromScollY = (scrollY: number) =>
  scrollY / TIME_ITEM_HEIGHT + Math.floor(ITEM_CNT_PER_SCROLL / 2);
