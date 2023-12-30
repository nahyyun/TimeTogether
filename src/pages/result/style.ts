import { theme } from "@/styles/theme";
import styled from "@emotion/styled";

export const Layout = styled.div`
  padding: 0 20px 30px;
  min-width: 280px;
`;

export const ContentLayout = styled.div`
  min-height: 300px;
  max-width: 360px;
  margin: 0px auto;
  padding: 20px 10px;
  display: flex;
  justify-content: center;
  align-items: center;
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
