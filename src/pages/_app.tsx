import Layout from "@/components/UI/Layout";
import GlobalStyle from "@/styles/globalStyle";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ReactQueryClient from "contexts/ReactQueryContext";
import SnackbarContextProvider from "contexts/SnackbarContext";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <Layout>
        <SnackbarContextProvider>
          <ReactQueryClient>
            <Component {...pageProps} />
            <ReactQueryDevtools />
          </ReactQueryClient>
        </SnackbarContextProvider>
      </Layout>
    </>
  );
}
