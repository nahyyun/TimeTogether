import { theme } from "@/styles/theme";
import styled from "@emotion/styled";

export const MeetingInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: 100%;
  height: 210px;
  border: 1px solid ${theme.colors.gray[100]};
  border-radius: 10px;
  font-size: ${theme.size.text.sm};
`;

export const MeetingTitle = styled.h3`
  font-size: ${theme.size.text.md};
  margin-bottom: 30px;
  font-weight: 600;
`;

export const MemberInfo = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
`;
