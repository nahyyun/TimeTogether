import { ROUTE_PATH } from "@/constants/path";
import {
  BackgroundColorTop,
  BackgroundColorBottom,
  CommonLayout,
} from "@/styles/commonStyle";
import * as S from "./style";

export default function MainPage() {
  return (
    <S.MainContainer>
      <BackgroundColorTop />
      <BackgroundColorBottom />
      <S.Heading>쉽고 간편하게 약속시간을 정하고 싶으신가요?</S.Heading>
      <S.Description>
        지금 바로 <strong>TIME TOGETHER</strong> 서비스를 통해
        <br />
        <strong>간편하게</strong> 약속 시간을 잡아보세요 ⏰
      </S.Description>
      <S.ButtonWrapper>
        <S.ButtonLink buttonstyle="primary" href={ROUTE_PATH["MAKE_MEETING"]}>
          일정 잡기
        </S.ButtonLink>
        <S.ButtonLink buttonstyle="secondary" href={ROUTE_PATH["LOGIN"]}>
          로그인
        </S.ButtonLink>
      </S.ButtonWrapper>
    </S.MainContainer>
  );
}
