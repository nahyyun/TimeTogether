import { theme } from "@/styles/theme";
import styled from "@emotion/styled";

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
  margin: 0 35px;
  font-size: ${theme.text.size.sm};
`;

export const MenuButtonWrapper = styled.div`
  position: relative;
  width: 32px;
  height: 32px;

  @media (min-width: 992px) {
    display: none;
  }
`;
