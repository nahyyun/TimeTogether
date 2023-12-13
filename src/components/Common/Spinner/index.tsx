import * as S from "./style";

type SpinnerProps = {
  size?: "sm" | "md";
};

export default function Spinner({ size = "md" }: SpinnerProps) {
  return <S.Spinner size={size} />;
}
