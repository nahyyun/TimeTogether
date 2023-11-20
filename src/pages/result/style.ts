import { theme } from "@/styles/theme";
import styled from "@emotion/styled";

export const ResultPageLayout = styled.div`
  padding: 0 40px;
`;

export const ParticipationInfoWrapper = styled.div`
  margin-top: 20px;
`;

export const ParticipationInfo = styled.div`
  display: flex;
  gap: 10px;
  margin: 4px 0 0 10px;
`;

export const MemberCountInfo = styled.span`
  font-size: ${theme.text.size.sm};
  line-height: ${theme.text.size.sm};
  align-self: center;
`;

export const AvailableMemberCount = styled.span`
  color: ${theme.colors.primary[300]};
`;

export const ToTalMemberCount = styled.span`
  color: ${theme.colors.text.muted};
`;
