import { theme } from "@/styles/theme";
import styled from "@emotion/styled";

export const Heading = styled.h3`
  color: ${theme.colors.gray[500]};
`;

export const ContentLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
