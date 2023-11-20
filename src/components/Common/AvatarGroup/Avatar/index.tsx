import { PropsWithChildren } from "@/types/propsWithChildren";
import * as S from "./style";

interface AvatarProps {
  borderColor?: keyof typeof S.AVATAR_BORDER_COLOR;
}

export default function Avatar({
  children,
  borderColor = "white",
}: PropsWithChildren<AvatarProps>) {
  return <S.Avatar borderColor={borderColor}>{children}</S.Avatar>;
}
