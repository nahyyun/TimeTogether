import { theme } from "@/styles/theme";
import styled from "@emotion/styled";

export const TIME_BLOCK_HEIGHT = 20;
export const TABLE_HEADER_HEIGHT = 60;
const BORDER_COLOR = theme.colors.gray[200];

export const ScheduleTableContainer = styled.div`
  margin: 0 10px 0 50px;
  border: 1px solid ${BORDER_COLOR};
  border-radius: 13px;
  position: relative;
  width: calc(100% - 60px);
`;

const TIME_SCALE_WIDTH = 33;
const TIME_DIVIDER = 15;

export const TableHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid ${BORDER_COLOR};
  gap: 5px;
  height: ${TABLE_HEADER_HEIGHT}px;

  &:before {
    content: "";
    position: absolute;
    top: ${TABLE_HEADER_HEIGHT - 2}px;
    left: -${TIME_DIVIDER}px;
    width: ${TIME_DIVIDER}px;
    height: 1px;
    border-bottom: 1px solid ${BORDER_COLOR};
  }
`;

export const Day = styled.div`
  font-size: ${theme.size.text.sm};
  color: ${theme.colors.gray[300]};
`;

export const Date = styled.div`
  display: flex;
  gap: 7px;
  align-items: center;
  font-size: ${theme.size.text.lg};
  font-weight: 600;
`;

export const TimeScale = styled.div<{ idx: number }>`
  position: absolute;
  left: -${TIME_SCALE_WIDTH + TIME_DIVIDER}px;
  top: ${({ idx }) => {
    const baseHeight = TABLE_HEADER_HEIGHT - 10 / 2;

    return baseHeight + idx * TIME_BLOCK_HEIGHT * 2 + "px";
  }};
  width: ${TIME_SCALE_WIDTH}px;
  text-align: center;
  font-size: ${theme.size.text.xs};
`;

export const TimeBlocksWrapper = styled.div`
  div:nth-of-type(odd):not(:last-child) {
    border-bottom: 1px dashed ${BORDER_COLOR};
  }

  div:nth-of-type(even):not(:last-child) {
    position: relative;
    border-bottom: 1px solid ${BORDER_COLOR};

    &:before {
      content: "";
      position: absolute;
      top: 18px;
      left: -${TIME_DIVIDER}px;
      width: ${TIME_DIVIDER}px;
      height: 1px;
      border-bottom: 1px solid ${BORDER_COLOR};
    }
  }
`;

export const TimeBlock = styled.div<{
  disabled: boolean;
  availableMemberCntByTime?: number;
  availableMemberCnt?: number;
}>`
  height: ${TIME_BLOCK_HEIGHT}px;

  &.selected {
    background-color: #82bed8;
    opacity: ${({ availableMemberCntByTime = 1, availableMemberCnt = 1 }) =>
      availableMemberCntByTime / availableMemberCnt};

    &:last-child {
      border-bottom-left-radius: 12px;
      border-bottom-right-radius: 12px;
    }
  }

  ${({ disabled }) =>
    disabled &&
    `
  pointer-events: none;
  background: repeating-linear-gradient(-45deg, #dfdfdf, #dfdfdf 1px, white 2px, white 3px);
  
  &:last-child {
    border-bottom-left-radius: 13px;
    border-bottom-right-radius: 13px;
  }
  `}
`;
