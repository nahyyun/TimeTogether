import styled from "@emotion/styled";

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  margin-top: 100px;
  gap: 15px;
`;

export const BackgroundContainer = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 680px;
  height: 680px;
  transform: translate(-30%, -30%);
  background: rgba(207, 231, 208, 0.71);
  filter: blur(150px);
  z-index: -10;
`;

export const Description = styled.p`
  line-height: 30px;
  text-align: center;
  margin: 20px 0 40px 0;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

