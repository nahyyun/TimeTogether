import { theme } from "@/styles/theme";
import {
  MAX_POSITION_X,
  MIN_POSITION_X,
  TOGGLE_BUTTON_WIDTH,
  TOGGLE_CONTAINER_WIDTH,
} from "@/constants/availableToggleButton";
import styled from "@emotion/styled";

export const ToggleButtonContainer = styled.label`
  position: relative;
  display: inline-block;
  width: ${TOGGLE_CONTAINER_WIDTH}px;
  height: 30px;
  line-height: 30px;
  margin: 5px 5px 0 0;
`;

export const ToggleBackground = styled.div<{ isChecked: boolean }>`
  background-color: ${({ isChecked }) =>
    isChecked ? theme.colors.primary[100] : theme.colors.gray[400]};
  color: ${theme.colors.text.white};
  position: relative;
  height: 100%;
  width: 100%;
  border-radius: 15px;
  transition: background-color 0.5s;
  cursor: pointer;
  padding: 0 7px;
`;

export const ToggleStatusSpan = styled.span<{ isChecked: boolean }>`
  font-size: ${theme.text.size.sm};
  visibility: ${({ isChecked }) => (isChecked ? "visible" : "hidden")};
  transition: opacity cubic-bezier(0, 0.18, 0.58, 1) 0.1s;
`;

export const ToggleButton = styled.div<{
  isChecked: boolean;
}>`
  position: absolute;
  top: 1px;
  left: 0px;
  width: ${TOGGLE_BUTTON_WIDTH}px;
  height: 28px;
  border-radius: 50%;
  background-color: ${theme.colors.white};
  cursor: pointer;
  transform: ${({ isChecked }) =>
    `translateX(${isChecked ? MAX_POSITION_X : MIN_POSITION_X}px)`};
  transition: transform 0.2s;
`;

export const CheckBox = styled.input`
  position: absolute;
  top: 0;
  width: 0;
`;
