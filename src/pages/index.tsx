import * as S from "./style";

export default function Home() {
  return (
    <S.MainContainer>
      <S.BackgroundContainer />
      <h1>쉽고 간편하게 약속시간을 정하고 싶으신가요?</h1>
      <S.DescriptionWrapper>
        <p>
          지금 바로 <strong>TIME TOGETHER</strong> 서비스를 통해
          <br />
          <strong>간편하게</strong> 약속 시간을 잡아보세요 ⏰
        </p>
      </S.DescriptionWrapper>
      <S.ButtonWrapper>
        <button>일정 잡기</button>
        <button>로그인</button>
      </S.ButtonWrapper>
    </S.MainContainer>
  );
}
