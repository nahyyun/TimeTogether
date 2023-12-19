import * as S from "@/components/Error/commonStyle";
import { ROUTE_PATH } from "@/constants/path";
import { BackgroundColorBottom, BackgroundColorTop } from "../style";

export default function LoginPage() {
  return (
    <S.Container>
      <BackgroundColorTop />
      <BackgroundColorBottom />
      <h1>서비스 준비중입니다.</h1>
      <div>
        <S.MainDesc>현재 페이지는 준비중입니다.</S.MainDesc>
        <S.SubDesc>
          빠른 시일 내에 서비스를 제공할 수 있도록 노력하겠습니다.
        </S.SubDesc>
      </div>
      <S.ButtonLink href={ROUTE_PATH.MAIN} size="full-width">
        메인으로 돌아가기
      </S.ButtonLink>
    </S.Container>
  );
}
