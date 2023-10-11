import { TIME_ITEM_HEIGHT } from "../../utils/timePicker";
import styled from "@emotion/styled";

export const TimePickerContainer = styled.div`
  position: absolute;
  top: 0;
  height: 100vh;
`;

export const StartTimeWrapper = styled.div`
  position: relative;
  top: 420px;
  height: ${TIME_ITEM_HEIGHT * 3}px;
  line-height: ${TIME_ITEM_HEIGHT}px;
  transition: transform 0.2s;
  overflow-y: hidden;
`;

export const Time = styled.div<{
  isActiveItem: boolean;
  scrollY: number;
}>`
  height: ${TIME_ITEM_HEIGHT}px;
  color: ${({ isActiveItem }) => (isActiveItem ? "black" : "lightgrey")};
  cursor: pointer;
  transform: translateY(${({ scrollY }) => -scrollY + "px"});
`;
