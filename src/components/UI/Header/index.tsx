import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import { HamburgerButtonIcon } from "../Icons";
import * as S from "./style";
import { ROUTE_PATH } from "@/constants/path";
import Button from "@/components/Common/Button";

export default function Header() {
  const [isSidebarOn, setIsSidebarOn] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOn((prev) => !prev);
  };

  const closeSidebar = () => {
    setIsSidebarOn(false);
  };

  useEffect(() => {
    return () => setIsSidebarOn(false);
  }, []);

  return (
    <S.Header>
      <Link href={ROUTE_PATH.MAIN}>
        <h2>TIME TOGETHER</h2>
      </Link>
      <Navbar isSidebarNav={false} />
      {!isSidebarOn && (
        <S.MenuButtonWrapper>
          <Button
            buttonstyle="icon-only"
            size="full"
            type="button"
            onClick={toggleSidebar}
          >
            <HamburgerButtonIcon />
          </Button>
        </S.MenuButtonWrapper>
      )}
      {isSidebarOn && (
        <Sidebar isSidebarOn={isSidebarOn} closeSidebar={closeSidebar} />
      )}
    </S.Header>
  );
}
