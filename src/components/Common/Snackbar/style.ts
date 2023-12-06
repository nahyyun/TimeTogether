import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import { theme } from "@/styles/theme";

const fadeIn = keyframes`
  from {
    top: 0;
    opacity: 0;
  }

  to {
    top: 60px;
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
`;

export const Snackbar = styled.div`
  position: fixed;
  top: 60px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  min-width: 250px;
  max-width: 400px;
  font-size: ${theme.size.text.sm};
  width: auto;
  padding: 12px 16px;
  background-color: ${theme.colors.success};
  color: ${theme.colors.text.secondary};
  border-radius: 23px;
  animation: ${fadeIn} 0.5s, ${fadeOut} 0.5s 3s;
`;
