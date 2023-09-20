import Dimmer from "../Dimmer";
import * as S from "./style";
import { CloseButtonIcon } from "../Icons";
import Navbar from "../Navbar";

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
          <S.SidebarCloseButton type="button" onClick={closeSidebar}>
            <CloseButtonIcon />
          </S.SidebarCloseButton>
        </S.SidebarHeader>
        <Navbar visible={isSidebarOn} />
      </S.Sidebar>
    </>
  );
}
