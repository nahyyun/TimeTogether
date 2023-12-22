import { theme } from "@/styles/theme";
import styled from "@emotion/styled";

export const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-top: 40px;
`;

export const Heading = styled.h3`
  color: ${theme.colors.gray[500]};
  margin-bottom: 40px;
`;

export const ContentLayout = styled.div<{ height: number }>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${({ height }) => height}px;
  min-height: 280px;
`;
