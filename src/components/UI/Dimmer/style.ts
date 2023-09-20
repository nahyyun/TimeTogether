import styled from "@emotion/styled";

export const Dimmer = styled.div`
  display: none;

  @media (max-width: 991px) {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.45);
  }
`;
