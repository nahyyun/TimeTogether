import { PropsWithChildren } from "@/types/propsWithChildren";
import * as S from "./style";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "md" | "full" | "square";
  buttonstyle?: "primary" | "secondary" | "icon-only" | "none";
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  isActive?: boolean;
}

const Button = ({ children, ...props }: PropsWithChildren<ButtonProps>) => {
  return <S.Button {...props}>{children}</S.Button>;
};

export default Button;
