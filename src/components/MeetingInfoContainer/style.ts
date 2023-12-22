import { theme } from "@/styles/theme";
import styled from "@emotion/styled";

export const MeetingResultWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  max-width: 330px;
  margin: 0 auto;
  padding: 20px;
`;

export const MainTitle = styled.h3`
  font-weight: 600;
  color: ${theme.colors.gray[500]};
`;
