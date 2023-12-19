import * as S from "./style";
import Link from "next/link";
import { ROUTE_PATH } from "@/constants/path";

export interface NavbarProps {
  isSidebarNav: boolean;
  isSidebarOn?: boolean;
}

export default function Navbar({ isSidebarNav, isSidebarOn }: NavbarProps) {
  return (
    <S.Navbar isSidebarNav={isSidebarNav} isSidebarOn={isSidebarOn}>
      <Link href={ROUTE_PATH.LOGIN}>로그인</Link>
      <Link href={ROUTE_PATH.MAKE_MEETING}>일정 생성</Link>
    </S.Navbar>
  );
}
