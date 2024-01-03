import { theme } from "@/styles/theme";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { ButtonProps } from ".";

const BUTTON_SIZE = {
  md: { width: "150px", height: "42px", fontSize: "13px" },
  full: { width: "100%", height: "100%" },
  square: { width: "45px", height: "45px" },
  "full-width": { width: "100%", height: "42px", fontSize: "13px" },
} as const;

const BUTTON_STYLE = {
  primary: {
    color: theme.colors.text.white,
    background: theme.colors.primary[100],
  },
  secondary: {
    color: theme.colors.text.secondary,
    background: "transparent",
    border: `1px solid ${theme.colors.gray[200]}`,
  },
  "icon-only": {
    color: theme.colors.text.primary,
    background: "transparent",
  },
  none: {
    borderRadius: "0px",
  },
  kakao: {
    color: "#3c1e1e",
    background: "#ffde00",
  },
} as const;

export const Button = styled.button<Pick<ButtonProps, "size" | "buttonstyle">>(
  { borderRadius: "5px" },
  ({ size = "md", buttonstyle = "primary" }) => css`
    ${BUTTON_SIZE[size]}
    ${BUTTON_STYLE[buttonstyle]}
    
    display: flex;
    justify-content: center;
    align-items: center;

    &.active-tab {
      font-weight: 600;
      height: 42px;
      color: ${theme.colors.primary[300]};
    }

    &.inactive-tab {
      border-bottom: 2px solid ${theme.colors.gray[100]};
      height: 42px;
      color: ${theme.colors.text.muted};
    }
  `
);
