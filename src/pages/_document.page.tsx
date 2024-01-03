import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="shortcut icon" href="/logo.png" />
        <meta property="og:url" content="https://time-together.vercel.app" />
        <meta
          property="og:title"
          content="time together | 약속 시간 결정 서비스"
        />
        <meta
          property="og:description"
          content="타임 투게더를 통해 쉽고 간편하게 약속 시간을 정해보세요."
        />
        <meta
          property="og:image"
          content="https://time-together.vercel.app/og_image.png"
        />
        <script
          src="https://t1.kakaocdn.net/kakao_js_sdk/2.5.0/kakao.min.js"
          integrity="sha384-kYPsUbBPlktXsY6/oNHSUDZoTX6+YI51f63jCPEIPFP09ttByAdxd2mEjKuhdqn4"
          crossOrigin="anonymous"
          defer
        ></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
