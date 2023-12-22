import { theme } from "@/styles/theme";
import { Button } from "@/components/Common/Button/style";
import styled from "@emotion/styled";
import Link from "next/link";

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  padding-top: 100px;
  gap: 15px;
`;

export const Heading = styled.h1`
  color: ${theme.colors.text.primary};
  word-break: keep-all;
  text-align: center;
  margin: 0 20px;
`;

export const Description = styled.p`
  line-height: 30px;
  text-align: center;
  margin: 20px 0 40px 0;
  color: ${theme.colors.text.secondary};
`;

export const ButtonWrapper = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
`;

export const ButtonLink = styled(Button.withComponent(Link))`
  text-align: center;
  line-height: 42px;
`;
