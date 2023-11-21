import { Button } from "@/components/Common/Button/style";
import { theme } from "@/styles/theme";
import styled from "@emotion/styled";
import Link from "next/link";

export const ResultPageLayout = styled.div`
  padding: 0 40px 40px 40px;
  display: flex;
  flex-direction: column;
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

export const ButtonLink = styled(Button.withComponent(Link))`
  text-align: center;
  line-height: 42px;
  align-self: center;
  margin-top: 10px;
`;

/** priority tab page */
export const PriorityResultWrapper = styled.div`
  margin: 20px 0;
`;

export const Heading = styled.h4`
  color: ${theme.colors.text.primary};
  line-height: 1.5;
`;

export const ResultDesc = styled.span`
  color: #4e5968;
  font-size: 13px;
  word-break: keep-all;
`;

export const CardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin: 30px 0;
`;

export const Card = styled.div`
  border: 1px solid lightgray;
  border-radius: 10px;
  padding: 7px 15px 7px 0;
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const DateInfo = styled.div`
  border-right: 1px solid lightgray;
  flex-grow: 0.4;
  align-self: stretch;
  line-height: 40px;
  text-align: center;
`;

export const Day = styled.div`
  font-size: ${theme.text.size.sm};
  height: 20px;
`;

export const Date = styled.div`
  font-size: ${theme.text.size.lg};
`;

export const TimeInfo = styled.span`
  font-size: ${theme.text.size.md};
  font-weight: 600;
  color: #4e5968;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const MemberInfoWrapper = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 5px;
`;

export const MemberInfo = styled.div`
  display: flex;
`;

export const _MemberCountInfo = styled.span`
  margin-left: 3px;
  font-size: 13px;
  color: #4e5968;
  align-self: center;
`;
