import { ITEM_CNT_PER_SCROLL, TIME_ITEM_HEIGHT } from "@/utils/timePicker";
import { theme } from "@/styles/theme";
import styled from "@emotion/styled";

export const TimePickerContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  height: ${TIME_ITEM_HEIGHT * ITEM_CNT_PER_SCROLL}px;
`;

export const Separator = styled.span`
  height: ${TIME_ITEM_HEIGHT * ITEM_CNT_PER_SCROLL}px;
  line-height: ${TIME_ITEM_HEIGHT * ITEM_CNT_PER_SCROLL}px;
  font-size: ${theme.text.size.xlg};
`;
