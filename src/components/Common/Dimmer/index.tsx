import * as S from "./style";

export interface DimmerProps {
  onCloseSidebar: () => void;
}

export default function Dimmer({ onCloseSidebar }: DimmerProps) {
  return <S.Dimmer onClick={onCloseSidebar} />;
}
