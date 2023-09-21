import Layout from "@/components/UI/Layout";
import GlobalStyle from "@/styles/globalStyle";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@emotion/react";
import { theme } from "@/styles/theme";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}
