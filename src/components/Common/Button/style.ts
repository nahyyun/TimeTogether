import { theme } from "@/styles/theme";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { ButtonProps } from ".";

const BUTTON_SIZE = {
  md: { width: "120px", height: "42px", fontSize: "14px" },
  full: { width: "100%", height: "100%" },
  square: { width: "45px", height: "45px" },
  "full-width": { width: "100%", height: "42px" },
} as const;

const BUTTON_STYLE = {
  primary: {
    color: theme.colors.text.white,
    background: theme.colors.primary[100],
  },
  secondary: {
    color: theme.colors.text.secondary,
    background: "transparent",
    border: `1px solid ${theme.colors.text.secondary}`,
  },
  "icon-only": {
    color: theme.colors.text.primary,
    background: "transparent",
  },
  none: {
    borderRadius: "0px",
  },
} as const;

export const Button = styled.button<ButtonProps>(
  { borderRadius: "5px" },
  (props) => css`
    ${BUTTON_SIZE[props.size || "md"]}
    ${BUTTON_STYLE[props.buttonstyle || "primary"]}
    

    &.active-tab {
      font-weight: 600;
      height: 42px;
      color: ${theme.colors.primary[200]};
    }

    &.inactive-tab {
      font-weight: 600;
      height: 42px;
      color: ${theme.colors.text.muted};
    }
  `
);
