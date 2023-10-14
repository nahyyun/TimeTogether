import { theme } from "@/styles/theme";
import styled from "@emotion/styled";

export const CustomHeaderWrapper = styled.div`
  margin: 10;
  display: flex;
  justifycontent: center;
  justify-content: space-evenly;
  align-items: center;
`;

export const MonthSpan = styled.span`
  font-size: ${theme.text.size.md};
  font-weight: 500;
`;
