import { useContext } from "react";
import { SnackbarContext } from "contexts/SnackbarContext";
import * as S from "./style";

export default function Snackbar() {
  const { isOpen, message } = useContext(SnackbarContext);

  return (
    <>
      {isOpen && (
        <S.Snackbar>
          <span>{message}</span>
        </S.Snackbar>
      )}
    </>
  );
}
