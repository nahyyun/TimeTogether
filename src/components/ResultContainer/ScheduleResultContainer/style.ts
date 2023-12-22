import { Button } from "@/components/Common/Button/style";
import { theme } from "@/styles/theme";
import styled from "@emotion/styled";
import Link from "next/link";

export const ParticipationInfoWrapper = styled.div`
  margin: 20px 0;
`;

export const Heading = styled.h4`
  color: ${theme.colors.gray[500]};
`;

export const ParticipationInfo = styled.div`
  display: flex;
  gap: 10px;
  margin: 4px 0 0 10px;
`;

export const MemberCountInfo = styled.span`
  font-size: ${theme.size.text.sm};
  line-height: ${theme.size.text.sm};
  align-self: center;
`;

export const AvailableMemberCount = styled.span`
  color: ${theme.colors.primary[300]};
`;

export const TotalMemberCount = styled.span`
  color: ${theme.colors.text.muted};
`;

export const ButtonLink = styled(Button.withComponent(Link))`
  text-align: center;
  line-height: 42px;
  align-self: center;
  margin-top: 50px;
`;
