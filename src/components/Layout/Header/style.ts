import { mq } from "@/styles/mediaQuery";
import { theme } from "@/styles/theme";
import styled from "@emotion/styled";

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
  margin: 0 35px;
  font-size: ${theme.size.text.sm};
`;

export const MenuButtonWrapper = styled.div`
  position: relative;
  width: 32px;
  height: 32px;

  ${mq.Large`
    display: none;
  `}
`;
