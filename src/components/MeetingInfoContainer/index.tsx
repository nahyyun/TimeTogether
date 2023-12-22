import { Meeting } from "@/types/meeting";
import MeetingInfo from "./MeetingInfo";
import * as S from "./style";

interface MeetingInfoContainerProps {
  mainTitle: string;
  meetingInfo: Meeting;
}

export default function MeetingInfoContainer({
  mainTitle,
  meetingInfo,
}: MeetingInfoContainerProps) {
  return (
    <S.MeetingResultWrapper>
      <S.MainTitle>{mainTitle}</S.MainTitle>
      <MeetingInfo meetingInfo={meetingInfo} />
    </S.MeetingResultWrapper>
  );
}
