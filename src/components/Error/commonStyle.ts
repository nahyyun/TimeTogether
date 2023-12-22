import { theme } from "@/styles/theme";
import { Button } from "@/components/Common/Button/style";
import styled from "@emotion/styled";
import Link from "next/link";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  max-width: 360px;
  gap: 20px;
  text-align: center;
  word-break: keep-all;
  padding-top: 150px;
`;

export const Title = styled.h1`
  color: ${theme.colors.primary[300]};
  font-size: ${theme.size.text.xxlg};
  font-weight: 800;
`;

export const MainDesc = styled.p`
  font-size: ${theme.size.text.md};
  font-weight: 700;
`;

export const SubDesc = styled.p`
  line-height: 1.7;
  font-size: ${theme.size.text.sm};
  margin-top: 12px;
  color: ${theme.colors.text.secondary};
`;

export const ButtonLink = styled(Button.withComponent(Link))`
  text-align: center;
  line-height: 42px;
`;
