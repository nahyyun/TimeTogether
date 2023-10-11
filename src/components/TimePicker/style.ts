import { theme } from "@/styles/theme";
import styled from "@emotion/styled";

export const TimePickerContainer = styled.div`
  position: absolute;
  top: 0;
  height: 100vh;
  display: flex;
  width: 100%;
  justify-content: center;
  gap: 10px;
`;

export const Separator = styled.span`
  position: relative;
  top: 420px;
  height: 120px;
  line-height: 120px;
  font-size: ${theme.text.size.xlg};
`;
