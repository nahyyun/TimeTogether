import { TIME_ITEM_HEIGHT } from "@/constants/scroll";
import { theme } from "@/styles/theme";
import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const TimeList = styled.div`
  line-height: ${TIME_ITEM_HEIGHT}px;
  overflow-y: hidden;
  text-align: center;
  cursor: pointer;
  touch-action: none;
`;

export const TimeItem = styled.div<{
  isActiveItem: boolean;
  scrollY: number;
  isScrollEnd: boolean;
}>`
  height: ${TIME_ITEM_HEIGHT}px;

  ${({ isActiveItem, scrollY, isScrollEnd }) => css`
    ${isScrollEnd && `transition: transform 0.2s`};

    transform: translateY(${-scrollY}px);

    ${isActiveItem
      ? `color: ${theme.colors.gray[500]}; font-weight: 700;`
      : `color: ${theme.colors.text.muted}; `}
  `}
`;