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
  width: ${({ size }) => AVATAR_SIZE[size]};
  height: ${({ size }) => AVATAR_SIZE[size]};
  margin-left: -10px;
  text-align: center;
  line-height: ${({ size }) => AVATAR_SIZE[size]};
  font-size: ${theme.text.size.sm};
  color: ${theme.colors.text.secondary};
  background-color: ${theme.colors.gray[200]};
  border: 1px solid ${({ borderColor }) => AVATAR_BORDER_COLOR[borderColor]};
  border-radius: ${theme.text.size.sm};
`;
