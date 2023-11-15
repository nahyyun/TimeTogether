import { theme } from "@/styles/theme";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { ButtonProps } from ".";

const BUTTON_SIZE = {
  md: { width: "120px", height: "42px", fontSize: "14px" },
  full: { width: "100%", height: "100%" },
  square: { width: "45px", height: "45px" },
} as const;

const BUTTON_STYLE = {
  primary: {
    color: theme.colors.text.light,
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
} as const;

export const Button = styled.button<ButtonProps>(
  { borderRadius: "5px" },
  (props) => css`
    ${BUTTON_SIZE[props.size || "md"]}
    ${BUTTON_STYLE[props.buttonstyle || "primary"]}
    ${props.isActive && `font-weight: 700`}
  `
);
