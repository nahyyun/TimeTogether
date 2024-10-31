import { Button } from "@/components/Common/Button/style";
import { mq } from "@/styles/mediaQuery";
import { theme } from "@/styles/theme";
import styled from "@emotion/styled";
import Link from "next/link";

export const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100% - 70px);
`;

export const ButtonWrapper = styled.div`
  display: flex;
  margin-top: 50px;
  justify-content: space-evenly;

  ${mq.Large`
    flex-direction: column;
    gap: 10px;

    a, button {
      width: 100%;
    }
  `}
`;

export const ButtonLink = styled(Button.withComponent(Link))`
  text-align: center;
  line-height: 42px;
  font-size: ${theme.size.text.sm};
`;
