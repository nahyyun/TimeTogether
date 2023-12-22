import { ROUTE_PATH } from "@/constants/path";
import {
  BackgroundColorBottom,
  BackgroundColorTop,
} from "@/styles/commonStyle";
import * as S from "../commonStyle";

export default function Custom500Container() {
  return (
    <S.Container>
      <BackgroundColorTop />
      <BackgroundColorBottom />
      <S.Title>500</S.Title>
      <S.MainDesc>페이지를 표시할 수 없습니다.</S.MainDesc>
      <S.SubDesc>서버에서 오류가 발생해 페이지를 표시할 수 없습니다.</S.SubDesc>
      <S.ButtonLink href={ROUTE_PATH.MAIN} size="full-width">
        메인으로 돌아가기
      </S.ButtonLink>
    </S.Container>
  );
}
