import { TIME_ITEM_HEIGHT } from "./../../utils/time";
import styled from "@emotion/styled";

export const TimePickerContainer = styled.div`
  position: absolute;
  top: 0;
  height: 800px;
`;

export const StartTimeWrapper = styled.div<{
  scrollY: number;
}>`
  line-height: ${TIME_ITEM_HEIGHT}px;

  transition: transform 0.2s;
  background-color: lightpink;
  overflow-y: hidden;
  position: relative;
  top: 50%;
  display: block;
  height: 120px;
`;

export const Time = styled.div<{
  isActiveItem: boolean;
  scrollY: number;
  idx: number;
}>`
  height: ${TIME_ITEM_HEIGHT}px;
  color: ${({ isActiveItem }) => (isActiveItem ? "black" : "red")};
  cursor: pointer;
  transform: translateY(${({ scrollY }) => -scrollY + "px"});
`;
