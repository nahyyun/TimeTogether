import * as S from "./style";

interface SnackbarProps {
  message: string;
}

export default function Snackbar({ message }: SnackbarProps) {
  return (
    <S.Snackbar>
      <span>{message}</span>
    </S.Snackbar>
  );
}
