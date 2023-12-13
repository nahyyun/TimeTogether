import Dimmer from "../Dimmer";
import * as S from "./style";
import { CloseIcon } from "../Icons";
import Navbar from "../Navbar";
import Button from "@/components/Common/Button";
import { useEffect } from "react";
import { useRouter } from "next/router";

interface SidebarProps {
  isSidebarOn: boolean;
  closeSidebar: () => void;
}

export default function Sidebar({ isSidebarOn, closeSidebar }: SidebarProps) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = () => {
      closeSidebar();

      router.events.off("routeChangeStart", handleRouteChange);
    };

    router.events.on("routeChangeStart", handleRouteChange);
  }, [router]);

  return (
    <>
      <Dimmer onCloseSidebar={closeSidebar} />
      <S.Sidebar>
        <S.SidebarHeader>
          <S.SidebarCloseButtonWrapper>
            <Button
              buttonstyle="icon-only"
              size="full"
              type="button"
              onClick={closeSidebar}
            >
              <CloseIcon />
            </Button>
          </S.SidebarCloseButtonWrapper>
        </S.SidebarHeader>
        <Navbar isSidebarNav={true} isSidebarOn={isSidebarOn} />
      </S.Sidebar>
    </>
  );
}
