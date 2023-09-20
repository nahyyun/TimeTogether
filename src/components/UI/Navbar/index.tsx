import * as S from "./style";
import Link from "next/link";
import { ROUTE_PATH } from "@/constants/path";

interface NavbarProps {
  visible: boolean;
}

export default function Navbar({ visible }: NavbarProps) {
  return (
    <S.Navbar visible={visible}>
      <Link href={ROUTE_PATH.LOGIN}>로그인</Link>
      <Link href={ROUTE_PATH.MAKE_MEETING}>일정 생성</Link>
    </S.Navbar>
  );
}
