import { mq } from "@/styles/mediaQuery";
import styled from "@emotion/styled";

export const MeetingDateTimePickerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

export const Layout = styled.div`
  min-height: 325.45px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;

  ${mq.Large`
    flex-direction: column;
    gap: 10px;

    button {
      width: 100%;
    }
  `}
`;
