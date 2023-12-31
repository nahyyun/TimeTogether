import { css, Global } from "@emotion/react";

const style = css`
  * {
    margin: 0;
    padding: 0;
    color: inherit;
    box-sizing: border-box;
  }
  html,
  body,
  div#__next {
    height: 100%;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji",
      "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
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
