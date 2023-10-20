import { theme } from "@/styles/theme";
import styled from "@emotion/styled";

export const MeetingResultWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
  gap: 30px;
  padding: 0 60px;
`;

export const MainTitle = styled.h2`
  font-size: ${theme.text.size.lg}px;
  font-weight: 600;
`;

export const MeetingInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: 100%;
  height: 240px;
  border: 1px solid rgb(221, 221, 221);
  box-shadow: rgba(0, 0, 0, 0.12) 0px 6px 16px;
  border-radius: 5%;
  font-size: ${theme.text.size.sm};
`;

export const MeetingTitle = styled.h3`
  font-size: ${theme.text.size.md};
  margin-bottom: 30px;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 20px;
`;
