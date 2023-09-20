import { useState } from "react";
import Link from "next/link";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import { HamburgerButtonIcon } from "../Icons";
import * as S from "./style";

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
      <Navbar isSidebarOn={isSidebarOn} />
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
