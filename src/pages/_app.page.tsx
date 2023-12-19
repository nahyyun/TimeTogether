import Layout from "@/components/UI/Layout";
import { useInitKakaoSdk } from "@/hooks/useInitKakaoSdk";
import GlobalStyle from "@/styles/globalStyle";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ReactQueryClient from "contexts/ReactQueryContext";
import SnackbarContextProvider from "contexts/SnackbarContext";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  useInitKakaoSdk();

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
