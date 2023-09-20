import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/UI/Navbar";
import * as S from "@/components/UI/Header/style";
import { HamburgerButtonIcon } from "../Icons";
import Sidebar from "../Sidebar";

export default function Header() {
  const [isSidebarOn, setIsSidebarOn] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOn((prev) => !prev);
  };

  const closeSidebar = () => {
    setIsSidebarOn(false);
  };

  return (
    <S.Header>
      <Link href="/">
        <h2>TIME TOGETHER</h2>
      </Link>
      <Navbar visible={isSidebarOn} />
      {!isSidebarOn && (
        <S.MenuButton type="button" onClick={toggleSidebar}>
          <HamburgerButtonIcon />
        </S.MenuButton>
      )}
      {isSidebarOn && (
        <Sidebar isSidebarOn={isSidebarOn} closeSidebar={closeSidebar} />
      )}
    </S.Header>
  );
}
