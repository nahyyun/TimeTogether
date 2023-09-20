import * as S from "./style";
import Link from "next/link";

interface NavbarProps {
  visible: boolean;
}

export default function Navbar({ visible }: NavbarProps) {
  return (
    <S.Navbar visible={visible}>
      <Link href="/login">로그인</Link>
      <Link href="/make-meeting">일정 생성</Link>
    </S.Navbar>
  );
}
