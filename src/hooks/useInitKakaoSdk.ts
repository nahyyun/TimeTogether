import { useEffect } from "react";

export function useInitKakaoSdk() {
  useEffect(() => {
    if (window.Kakao.isInitialized()) return;

    window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_API_KEY);
  }, []);
}
