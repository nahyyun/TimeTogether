import { theme } from "@/styles/theme";
import styled from "@emotion/styled";

export const Heading = styled.h1`
  color: ${theme.colors.text.primary};
  line-height: 1.5;
  white-space: pre-line;
  font-size: ${theme.size.text.md};
`;

export const ResultDesc = styled.span`
  color: ${theme.colors.text.secondary};
  font-size: ${theme.size.text.sm};
  word-break: keep-all;
`;

export const CardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin: 30px 0;
`;

export const Card = styled.div`
  border: 1px solid ${theme.colors.gray[200]};
  border-radius: 10px;
  padding: 7px 15px 7px 0;
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const DateInfo = styled.div`
  border-right: 1px solid ${theme.colors.gray[200]};
  flex-grow: 0.4;
  align-self: stretch;
  line-height: 40px;
  text-align: center;
`;

export const Day = styled.div`
  font-size: ${theme.size.text.sm};
  height: 20px;
`;

export const Date = styled.div`
  font-size: ${theme.size.text.lg};
`;

export const TimeInfo = styled.span`
  font-size: ${theme.size.text.md};
  font-weight: 600;
  color: ${theme.colors.text.primary};
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const MemberInfoWrapper = styled.div`
  display: flex;
  gap: 18px;
  margin-top: 5px;
`;

export const MemberInfo = styled.div`
  display: flex;
`;

export const MemberCountInfo = styled.span`
  margin-left: 4px;
  font-size: ${theme.size.text.sm};
  color: ${theme.colors.text.secondary};
  align-self: center;
`;
