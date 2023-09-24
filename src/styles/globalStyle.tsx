import { css, Global } from "@emotion/react";

const style = css`
  * {
    margin: 0;
    padding: 0;
    color: inherit;
  }
  html,
  body,
  div#__next {
    height: 100%;
  }
  button {
    background: none;
    border: 0;
    cursor: pointer;
  }
  a {
    text-decoration: none;
  }
  ul {
    list-style: none;
  }
`;

export default function GlobalStyle() {
  return <Global styles={style} />;
}
