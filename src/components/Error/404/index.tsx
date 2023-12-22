import { ROUTE_PATH } from "@/constants/path";
import {
  BackgroundColorBottom,
  BackgroundColorTop,
} from "@/styles/commonStyle";
import * as S from "../commonStyle";

export default function Custom404Container() {
  return (
    <S.Container>
      <BackgroundColorTop />
      <BackgroundColorBottom />
      <S.Title>404</S.Title>
      <div>
        <S.MainDesc>찾으시는 페이지가 없습니다.</S.MainDesc>
        <S.SubDesc>
          잘못된 접근이거나 요청하신 페이지를 찾을 수 없습니다. <br />
          입력하신 페이지의 주소가 정확한지 다시 한번 확인해 주시기 바랍니다.
        </S.SubDesc>
      </div>
      <S.ButtonLink href={ROUTE_PATH.MAIN} size="full-width">
        메인으로 돌아가기
      </S.ButtonLink>
    </S.Container>
  );
}
