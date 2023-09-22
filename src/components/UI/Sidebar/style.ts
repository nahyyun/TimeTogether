import { theme } from "@/styles/theme";
import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

const showSidebarAnimation = keyframes`
    from {
        transform: translateX(100%);
    }
    to {
        transform: translateX(0);
    }
`;

export const SidebarCloseButtonWrapper = styled.div`
  position: relative;
  width: 24px;
  height: 24px;
  margin: 10px;

  @media (min-width: 992px) {
    display: none;
  }
`;

export const Sidebar = styled.aside`
  position: fixed;
  top: 0;
  right: 0;
  width: 30%;
  height: 100%;
  z-index: 10;
  border-radius: 30px 0 0 30px;
  background-color: ${theme.colors.bg.primary};
  animation: ${showSidebarAnimation} 0.3s ease;

  @media (min-width: 992px) {
    display: none;
  }
`;

export const SidebarHeader = styled.header`
    display: flex;
    justify-content: flex-end;
}
`;
