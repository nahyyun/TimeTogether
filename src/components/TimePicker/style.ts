import { TIME_ITEM_HEIGHT } from "./../../utils/time";
import styled from "@emotion/styled";

export const TimePickerContainer = styled.div`
  height: 100%;
  display: flex;
  gap: 15px;
  overflow-y: hidden;
`;

export const StartTimeWrapper = styled.div<{
  scrollY: number;
}>`
  height: ${TIME_ITEM_HEIGHT * 3}px;
  line-height: ${TIME_ITEM_HEIGHT}px;
  transform: translateY(${({ scrollY }) => -scrollY + "px"});
  transition: transform 0.2s;
`;

export const Time = styled.div<{ isActiveItem: boolean }>`
  height: ${TIME_ITEM_HEIGHT}px;
  color: ${({ isActiveItem }) => (isActiveItem ? "black" : "lightgray")};
`;
