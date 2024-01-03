import { theme } from "@/styles/theme";
import { Button } from "@/components/Common/Button/style";
import styled from "@emotion/styled";
import Link from "next/link";
import { mq } from "@/styles/mediaQuery";

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  padding-top: 160px;
  gap: 15px;
`;

export const Heading = styled.h1`
  color: ${theme.colors.text.primary};
  word-break: keep-all;
  text-align: center;
  margin: 0 20px;

  ${mq.Large`
  font-size: ${theme.size.text.xxlg};
`}
`;

export const Description = styled.p`
  line-height: 30px;
  text-align: center;
  margin: 20px 0 40px 0;
  color: ${theme.colors.text.secondary};

  ${mq.Large`
  font-size: ${theme.size.text.lg};
`}
`;

export const ButtonWrapper = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
`;

export const ButtonLink = styled(Button.withComponent(Link))`
  text-align: center;
  line-height: 42px;
  font-size: 15px;
`;
