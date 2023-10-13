import { TimeRange } from "@/constants/timeRange";

export const ITEM_CNT_PER_SCROLL = 3;
const ITEM_CNT_OF_LAST_SCROLL_PAGE = 2;
export const TIME_ITEM_HEIGHT = 40;

const SCROLLED_ITEM_CNT_BEFORE_LAST_SCROLL_PAGE =
  TimeRange?.length - ITEM_CNT_OF_LAST_SCROLL_PAGE;

export const MIN_SCROLL_Y = -TIME_ITEM_HEIGHT;
export const MAX_SCROLL_Y =
  TIME_ITEM_HEIGHT * SCROLLED_ITEM_CNT_BEFORE_LAST_SCROLL_PAGE;
