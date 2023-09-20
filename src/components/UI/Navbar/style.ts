import styled from "@emotion/styled";

export const Navbar = styled.nav<{ visible: boolean }>`
  display: flex;
  gap: 40px;

  @media (max-width: 991px) {
    display: none;

    ${({ visible }) =>
      visible &&
      `
    display: flex;
    flex-direction: column;
    margin: 60px 0  0 20px;
    font-size: 18px;
    font-weight: 600;
  `}
  }
`;
