import { Button } from "@/components/Common/Button/style";
import { theme } from "@/styles/theme";
import styled from "@emotion/styled";
import Link from "next/link";

export const ButtonWrapper = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 20px;
`;

export const ButtonLink = styled(Button.withComponent(Link))`
  text-align: center;
  line-height: 42px;
  font-size: ${theme.size.text.sm};
`;
