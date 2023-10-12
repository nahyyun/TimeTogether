import styled from "@emotion/styled";
import { TIME_ITEM_HEIGHT } from "@/utils/timePicker";

export const TimeList = styled.div`
  line-height: ${TIME_ITEM_HEIGHT}px;
  overflow-y: hidden;
  text-align: center;
`;

export const TimeItem = styled.div<{
  isActiveItem: boolean;
  scrollY: number;
}>`
  height: ${TIME_ITEM_HEIGHT}px;
  ${({ isActiveItem }) =>
    isActiveItem ? "color: black; font-weight: 700;" : "color: #949494"};
  transform: ${({ scrollY }) => `translateY(${-scrollY}px)`};
  transition: transform 0.2s;
  cursor: pointer;
`;
