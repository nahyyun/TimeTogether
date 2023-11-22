import { Button } from "@/components/Common/Button/style";
import { theme } from "@/styles/theme";
import styled from "@emotion/styled";
import Link from "next/link";

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

export const MeetingInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: 100%;
  height: 210px;
  border: 1px solid ${theme.colors.gray[200]};
  border-radius: 10px;
  font-size: ${theme.text.size.sm};
`;

export const MeetingTitle = styled.h3`
  font-size: ${theme.text.size.md};
  margin-bottom: 30px;
  font-weight: 600;
`;

export const MemberInfo = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
`;


export const ButtonWrapper = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 20px;
`;

export const ButtonLink = styled(Button.withComponent(Link))`
  text-align: center;
  line-height: 42px;
  font-size: ${theme.text.size.sm};
`;
