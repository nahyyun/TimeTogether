import Layout from "@/components/UI/Layout";
import GlobalStyle from "@/styles/globalStyle";
import ReactQueryClient from "contexts/ReactQueryContext";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <Layout>
        <ReactQueryClient>
          <Component {...pageProps} />
        </ReactQueryClient>
      </Layout>
    </>
  );
}
