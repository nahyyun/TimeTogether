import { theme } from "@/styles/theme";
import styled from "@emotion/styled";

export const MeetingInfoInputsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 70px;
  padding-top: 50px;
`;

export const Fieldset = styled.div`
  h2 {
    font-weight: 600;
    font-size: ${theme.text.size.lg};
  }

  span {
    font-size: ${theme.text.size.sm};
  }

  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 18px;
`;
