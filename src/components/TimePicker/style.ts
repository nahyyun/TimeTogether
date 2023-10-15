import { ITEM_CNT_PER_SCROLL, TIME_ITEM_HEIGHT } from "@/constants/scroll";
import { theme } from "@/styles/theme";
import styled from "@emotion/styled";

export const TimePickerContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  gap: 15px;
  height: ${TIME_ITEM_HEIGHT * ITEM_CNT_PER_SCROLL}px;
`;

export const HighlightBorder = styled.div`
  position: absolute;
  top: ${TIME_ITEM_HEIGHT}px;
  height: ${TIME_ITEM_HEIGHT}px;
  width: 100%;
  border-top: 1px solid #eaeaea;
  border-bottom: 1px solid #eaeaea;
`;

export const Separator = styled.span`
  height: ${TIME_ITEM_HEIGHT * ITEM_CNT_PER_SCROLL}px;
  line-height: ${TIME_ITEM_HEIGHT * ITEM_CNT_PER_SCROLL}px;
  font-size: ${theme.text.size.xlg};
`;
