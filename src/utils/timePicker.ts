import {
  ITEM_CNT_PER_SCROLL,
  MAX_SCROLL_Y,
  MIN_SCROLL_Y,
  TIME_ITEM_HEIGHT,
} from "@/constants/scroll";

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
