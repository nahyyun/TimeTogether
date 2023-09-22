import Button from "@/components/Common/Button";
import * as S from "./style";

export default function Home() {
  return (
    <S.MainContainer>
      <S.BackgroundContainer />
      <h1>쉽고 간편하게 약속시간을 정하고 싶으신가요?</h1>
      <S.Description>
        지금 바로 <strong>TIME TOGETHER</strong> 서비스를 통해
        <br />
        <strong>간편하게</strong> 약속 시간을 잡아보세요 ⏰
      </S.Description>
      <S.ButtonWrapper>
        <Button buttonStyle="primary" type="button">
          일정 잡기
        </Button>
        <Button buttonStyle="secondary" type="button">
          로그인
        </Button>
      </S.ButtonWrapper>
    </S.MainContainer>
  );
}
