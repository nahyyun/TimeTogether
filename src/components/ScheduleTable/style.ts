import { theme } from "@/styles/theme";
import styled from "@emotion/styled";

const TIME_BLOCK_HEIGHT = 20;
const TABLE_HEADER_HEIGHT = 50;

export const ScheduleTableContainer = styled.div`
  width: 250px;
  margin: 0 auto;
  border: 1px solid lightgray;
  border-radius: 16px;
  position: relative;
`;

export const TableHeader = styled.div`
  text-align: center;
  line-height: ${TABLE_HEADER_HEIGHT}px;
  border-bottom: 2px solid lightgray;
`;

export const TimeScale = styled.div<{ idx: number }>`
  position: absolute;
  left: -40px;
  top: ${({ idx }) => {
    const baseHeight = TABLE_HEADER_HEIGHT + TIME_BLOCK_HEIGHT * 2 - 8;

    return baseHeight + idx * TIME_BLOCK_HEIGHT * 2 + "px";
  }};
  width: 1rem;
  text-align: center;
`;

export const TimeBlock = styled.div<{ disabled: boolean }>`
  height: ${TIME_BLOCK_HEIGHT}px;

  &.selected {
    background-color: ${theme.colors.primary[100]};
  }

  &:nth-of-type(odd) {
    border-bottom: 1px dashed lightgray;
  }

  &:nth-of-type(even):not(:last-child) {
    position: relative;
    border-bottom: 1px solid lightgray;

    &:before {
      content: "";
      position: absolute;
      top: 18px;
      left: -15px;
      width: 15px;
      height: 1px;
      border-bottom: 1px solid lightgray;
    }
  }

  ${({ disabled }) => disabled && "pointer-events: none"}
`;
