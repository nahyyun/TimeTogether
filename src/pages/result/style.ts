import { theme } from "@/styles/theme";
import styled from "@emotion/styled";

export const ResultPageLayout = styled.div`
  padding: 0 40px 40px 40px;
  display: flex;
  flex-direction: column;
`;

export const ContentLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
  min-height: 400px;
`;

export const Heading = styled.h3`
  color: ${theme.colors.text.secondary};
  margin-bottom: 10px;
`;

export const SubDesc = styled.p`
  color: ${theme.colors.gray[300]};
  font-size: ${theme.size.text.sm};
  text-align: center;
`;

export const TimeResultContainerLayout = styled.div`
  margin: 20px 0;
`;
