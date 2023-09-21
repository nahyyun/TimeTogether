import styled from "@emotion/styled";
import { NavbarProps } from ".";

export const Navbar = styled.nav<NavbarProps>`
  display: flex;
  gap: 40px;
  font-weight: 600;

  @media (max-width: 991px) {
    display: none;

    ${({ isSidebarNav, isSidebarOn, theme }) =>
      isSidebarNav &&
      isSidebarOn &&
      `
    display: flex;
    flex-direction: column;
    margin: 60px 0  0 20px;
    font-size: ${theme.text.size.md};
  `}
  }
`;
