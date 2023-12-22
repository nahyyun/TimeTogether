import { theme } from "@/styles/theme";
import styled from "@emotion/styled";

export const Layout = styled.div`
  padding: 0 20px 30px;
`;

export const ContentLayout = styled.div`
  min-height: 400px;
  max-width: 360px;
  margin: 0px auto;
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
