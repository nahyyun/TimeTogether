import { theme } from "@/styles/theme";
import styled from "@emotion/styled";

export const TabList = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  max-width: 800px;
  margin: 0 auto;
`;

export const HighLighter = styled.div<{ activeTabIdx: number }>`
  position: absolute;
  width: 50%;
  bottom: 0px;
  left: 0px;
  height: 2px;
  background: ${theme.colors.primary[300]};
  transform: ${({ activeTabIdx }) => `translateX(${activeTabIdx * 100}%)`};
  transition: transform 0.3s;
`;
