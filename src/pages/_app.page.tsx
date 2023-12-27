import Layout from "@/components/Layout/Layout";
import { useInitKakaoSdk } from "@/hooks/useInitKakaoSdk";
import GlobalStyle from "@/styles/globalStyle";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ReactQueryClient from "contexts/ReactQueryContext";
import SnackbarContextProvider from "@/contexts/SnackbarContext";
import type { AppProps } from "next/app";
import HeadMeta from "@/components/HeadMeta";

export default function App({ Component, pageProps }: AppProps) {
  useInitKakaoSdk();

  return (
    <>
      <HeadMeta />
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
