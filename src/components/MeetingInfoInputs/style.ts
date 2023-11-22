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
    color: ${theme.colors.text.primary};
  }

  label,
  span {
    font-size: ${theme.text.size.sm};
    color: ${theme.colors.text.secondary};
  }

  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 15px;
`;
