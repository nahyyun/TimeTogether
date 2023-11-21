import { PropsWithChildren } from "@/types/propsWithChildren";
import * as S from "./style";

interface AvatarProps {
  size?: "sm" | "md";
  borderColor?: "white" | "lightgray";
}

export default function Avatar({
  size = "md",
  borderColor = "white",
  children,
}: PropsWithChildren<AvatarProps>) {
  return (
    <S.Avatar borderColor={borderColor} size={size}>
      {children}
    </S.Avatar>
  );
}
