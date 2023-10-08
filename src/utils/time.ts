export const TimeRange = Array.from({ length: 48 }, (_, hour: number) => {
  const hours = Math.floor((hour * 30) / 60);
  const minutes = (hour * 30) % 60;

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0"
  )}`;
});

const VISIBLE_ITEM_CNT = 3;
export const TIME_ITEM_HEIGHT = 40;
const SCROLLED_ITEM_CNT = TimeRange.length - VISIBLE_ITEM_CNT;

export const MIN_SCROLL_Y = 0;
export const MAX_SCROLL_Y = TIME_ITEM_HEIGHT * SCROLLED_ITEM_CNT;
