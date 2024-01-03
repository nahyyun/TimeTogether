import { Button } from "@/components/Common/Button/style";
import { theme } from "@/styles/theme";
import styled from "@emotion/styled";
import Link from "next/link";

export const ButtonLink = styled(Button.withComponent(Link))`
  margin-top: 50px;
  text-align: center;
  line-height: 42px;
  font-size: ${theme.size.text.sm};
`;
