import { theme } from "@/styles/theme";
import styled from "@emotion/styled";

const TIME_BLOCK_HEIGHT = 20;
const TABLE_HEADER_HEIGHT = 70;
const borderColor = "#c6c6c6";

export const ScheduleTableContainer = styled.div`
  width: 260px;
  margin: 30px auto;
  border: 1px solid ${borderColor};
  border-radius: 13px;
  position: relative;
`;

const TIME_SCALE_WIDTH = 33;
const TIME_DIVIDER = 15;

export const TableHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid ${borderColor};
  gap: 5px;
  height: ${TABLE_HEADER_HEIGHT}px;

  &:before {
    content: "";
    position: absolute;
    top: ${TABLE_HEADER_HEIGHT - 2}px;
    left: -${TIME_DIVIDER}px;
    width: ${TIME_DIVIDER}px;
    height: 1px;
    border-bottom: 1px solid ${borderColor};
  }
`;

export const Day = styled.div`
  font-size: ${theme.text.size.md};
  font-weight: 700;
  color: #515954;
`;

export const Date = styled.div`
  font-size: ${theme.text.size.sm};
  color: #acacac;
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
  font-size: ${theme.text.size.xs};
`;

export const TimeBlocksWrapper = styled.div`
  div:nth-of-type(odd) {
    border-bottom: 1px dashed ${borderColor};
  }

  div:nth-of-type(even):not(:last-child) {
    position: relative;
    border-bottom: 1px solid ${borderColor};

    &:before {
      content: "";
      position: absolute;
      top: 18px;
      left: -${TIME_DIVIDER}px;
      width: ${TIME_DIVIDER}px;
      height: 1px;
      border-bottom: 1px solid ${borderColor};
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
    background-color: ${theme.colors.primary[200]};
    opacity: ${({ availableMemberCntByTime = 0, availableMemberCnt = 0 }) =>
      availableMemberCntByTime / availableMemberCnt};
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
