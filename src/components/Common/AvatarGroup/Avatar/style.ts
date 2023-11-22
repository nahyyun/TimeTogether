import { theme } from "@/styles/theme";
import styled from "@emotion/styled";

const AVATAR_SIZE = {
  sm: "22px",
  md: "30px",
} as const;

export const AVATAR_BORDER_COLOR = {
  lightgray: theme.colors.gray[200],
  white: theme.colors.white,
} as const;

export const Avatar = styled.div<{
  size: keyof typeof AVATAR_SIZE;
  borderColor: keyof typeof AVATAR_BORDER_COLOR;
}>`
  ${({ size, borderColor }) => {
    const { text, colors } = theme;

    return `width: ${AVATAR_SIZE[size]};
            height:  ${AVATAR_SIZE[size]};
            margin-left: -10px;
            text-align: center;
            line-height: ${AVATAR_SIZE[size]};
            font-size: ${text.size.sm};
            color: ${colors.text.secondary};
            background-color: ${colors.white};
            border: 1px solid ${AVATAR_BORDER_COLOR[borderColor]};
            border-radius: ${AVATAR_SIZE[size]};`;
  }}
`;
