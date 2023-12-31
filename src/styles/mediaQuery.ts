import { css } from "@emotion/react";

const breakPoints = {
  Large: 992,
};

export const mq = {
  Large: (literal: TemplateStringsArray, ...exp: any[]) => css`
    @media (min-width: ${breakPoints["Large"]}px) {
      ${css(literal, ...exp)}
    }
  `,
};
