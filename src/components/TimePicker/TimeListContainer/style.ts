import { TIME_ITEM_HEIGHT } from "@/constants/scroll";
import { theme } from "@/styles/theme";
import styled from "@emotion/styled";

export const TimeList = styled.div`
  line-height: ${TIME_ITEM_HEIGHT}px;
  overflow-y: hidden;
  text-align: center;
  touch-action: none;
  user-select: none;
`;

export const TimeItem = styled.div<{
  isActiveItem: boolean;
  scrollY: number;
}>`
  height: ${TIME_ITEM_HEIGHT}px;
  ${({ isActiveItem }) =>
    isActiveItem
      ? `color: ${theme.colors.gray[500]}; font-weight: 700;`
      : `color: ${theme.colors.text.muted}`};
  transform: ${({ scrollY }) => `translateY(${-scrollY}px)`};
  transition: transform 0.2s;
  cursor: pointer;
`;
