import { css } from "@emotion/react";

const breakPoints = {
  Large: 992,
};

export const mq = {
  Large: (
    literal: TemplateStringsArray
  ) => `@media (min-width: ${breakPoints["Large"]}px) {
       ${literal}
    }`,
};
