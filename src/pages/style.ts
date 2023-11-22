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

const BackgroundColorCommonCSS = `
  position: fixed;
  width: 100%;
  height: 100%;
  background: ${theme.colors.primary[50]};
  opacity: 0.71;
  filter: blur(150px);
  z-index: -10;
`;

export const BackgroundColorTop = styled.div`
  ${BackgroundColorCommonCSS}
  left: 0;
  top: 0;
  transform: translate(-50%, -50%);
`;

export const BackgroundColorBottom = styled.div`
  ${BackgroundColorCommonCSS}
  right: 0;
  bottom: 0;
  transform: translate(50%, 50%);
`;

export const Heading = styled.h1`
  color: ${theme.colors.text.primary};
  margin: 0 10px;
  word-break: keep-all;
  text-align: center;
`;

export const Description = styled.p`
  line-height: 30px;
  text-align: center;
  margin: 20px 0 40px 0;
  color: ${theme.colors.text.secondary};
`;

export const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const ButtonLink = styled(Button.withComponent(Link))`
  text-align: center;
  line-height: 42px;
`;
