import { theme } from "@/styles/theme";
import { css, keyframes } from "@emotion/react";
import styled from "@emotion/styled";

const spin = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
  `;

type SIZE_KEY = "sm" | "md";

const SPINNER_SIZE: Record<SIZE_KEY, string> = {
  sm: "width: 20px; height: 20px;",
  md: "width: 40px; height: 40px;",
} as const;

const SPINNER_BORDER_WIDTH: Record<SIZE_KEY, string> = {
  sm: "2px",
  md: "4px",
} as const;

export const Spinner = styled.div<{ size?: SIZE_KEY }>`
  ${({ size = "md" }) => css`
    border: ${SPINNER_BORDER_WIDTH[size]} solid ${theme.colors.gray[50]};
    border-top: ${SPINNER_BORDER_WIDTH[size]} solid ${theme.colors.primary[200]};
    border-radius: 50%;
    animation: ${spin} 1s linear infinite;

    ${SPINNER_SIZE[size]};
  `};

`;
