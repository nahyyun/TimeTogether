import Dimmer from "../Dimmer";
import * as S from "./style";
import { CloseButtonIcon } from "../Icons";
import Navbar from "../Navbar";
import Button from "@/components/Common/Button";

interface SidebarProps {
  isSidebarOn: boolean;
  closeSidebar: () => void;
}

export default function Sidebar({ isSidebarOn, closeSidebar }: SidebarProps) {
  return (
    <>
      <Dimmer onCloseSidebar={closeSidebar} />
      <S.Sidebar>
        <S.SidebarHeader>
          <S.SidebarCloseButtonWrapper>
            <Button
              buttonStyle="icon-only"
              size="full"
              type="button"
              onClick={closeSidebar}
            >
              <CloseButtonIcon />
            </Button>
          </S.SidebarCloseButtonWrapper>
        </S.SidebarHeader>
        <Navbar isSidebarNav={true} isSidebarOn={isSidebarOn} />
      </S.Sidebar>
    </>
  );
}
