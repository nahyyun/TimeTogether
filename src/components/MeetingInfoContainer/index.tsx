import { Meeting } from "@/types/meeting";
import { PropsWithChildren } from "@/types/propsWithChildren";
import MeetingInfo from "./MeetingInfo";
import * as S from "./style";

interface MeetingInfoContainerProps {
  mainTitle: string;
  meetingInfo: Meeting;
}

export default function MeetingInfoContainer({
  mainTitle,
  meetingInfo,
  children,
}: PropsWithChildren<MeetingInfoContainerProps>) {
  return (
    <S.MeetingResultWrapper>
      <S.MainTitle>{mainTitle}</S.MainTitle>
      <MeetingInfo meetingInfo={meetingInfo} />
      {children}
    </S.MeetingResultWrapper>
  );
}
