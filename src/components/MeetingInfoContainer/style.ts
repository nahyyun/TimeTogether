import { theme } from "@/styles/theme";
import styled from "@emotion/styled";

export const MeetingResultWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  padding: 30px 60px 0 60px;
`;

export const MainTitle = styled.h3`
  font-weight: 600;
  color: ${theme.colors.gray[500]};
`;
