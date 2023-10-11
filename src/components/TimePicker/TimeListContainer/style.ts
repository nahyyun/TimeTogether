import styled from "@emotion/styled";
import { TIME_ITEM_HEIGHT } from "utils/timePicker";

export const TimeListContainer = styled.div``;

export const TimeList = styled.div`
  position: relative;
  top: 420px;
  height: ${TIME_ITEM_HEIGHT * 3}px;
  line-height: ${TIME_ITEM_HEIGHT}px;
  overflow-y: hidden;
`;

export const TimeItem = styled.div<{
  isActiveItem: boolean;
  scrollY: number;
}>`
  height: ${TIME_ITEM_HEIGHT}px;
  color: ${({ isActiveItem }) => (isActiveItem ? "black" : "lightgrey")};
  cursor: pointer;
  transform: translateY(${({ scrollY }) => -scrollY + "px"});
  transition: transform 0.2s;
`;
