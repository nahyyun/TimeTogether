import { theme } from "@/styles/theme";
import styled from "@emotion/styled";

export const TabList = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
`;

export const HighLighter = styled.div<{ activeTabIdx: number }>`
  position: absolute;
  width: 147px;
  bottom: 0px;
  left: 0px;
  height: 2px;
  background: ${theme.colors.primary[200]};
  transform: ${({ activeTabIdx }) => `translateX(${activeTabIdx * 100}%)`};
  transition: transform 0.3s;
`;
