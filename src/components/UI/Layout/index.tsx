import { PropsWithChildren } from "@/types/propsWithChildren";
import Header from "../Header";
import * as S from "./style";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <Header />
      <S.Main>{children}</S.Main>
    </>
  );
}
