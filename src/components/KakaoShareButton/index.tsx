import React from "react";
import Button from "../Common/Button";
import Image from "next/image";
import * as S from "./style";

interface KakaoShareButtonProps {
  size?: "md" | "full-width";
  clickHandler: () => void;
}

export default function KakaoShareButton({
  size = "full-width",
  clickHandler,
}: KakaoShareButtonProps) {
  return (
    <Button
      type="button"
      size={size}
      buttonstyle="kakao"
      onClick={clickHandler}
    >
      <S.ButtonContent>
        <Image
          src="/kakaotalk.svg"
          alt="카카오톡 공유 보내기 버튼"
          width={18}
          height={18}
        />
        카카오톡 공유하기
      </S.ButtonContent>
    </Button>
  );
}
