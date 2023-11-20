import { theme } from "@/styles/theme";
import styled from "@emotion/styled";

export const AVATAR_BORDER_COLOR = {
  lightgray: theme.colors.bg.primary,
  white: theme.colors.bg.secondary,
} as const;

export const Avatar = styled.div<{
  borderColor: keyof typeof AVATAR_BORDER_COLOR;
}>`
  width: 30px;
  height: 30px;
  margin-left: -10px;
  text-align: center;
  line-height: 30px;
  font-size: ${theme.text.size.sm};
  color: ${theme.colors.text.secondary};
  background-color: ${theme.colors.bg.secondary};
  border: 1px solid ${({ borderColor }) => AVATAR_BORDER_COLOR[borderColor]};
  border-radius: ${theme.text.size.sm};
`;
