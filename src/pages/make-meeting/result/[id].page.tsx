import { ROUTE_PATH } from "@/constants/path";
import * as S from "./style";
import MeetingInfoContainer from "@/components/MeetingInfoContainer";
import { Kakao } from "@/utils/kakao";
import { extractDatePartsFromStringType } from "@/utils/date";
import { DAYS_OF_WEEK_KO } from "@/constants/day";
import { CommonLayout } from "@/styles/commonStyle";
import KakaoShareButton from "@/components/KakaoShareButton";
import { useGetMeeting } from "@/hooks/queries/meeting";
import { useRouter } from "next/router";
import Spinner from "@/components/Common/Spinner";

export default function MakeMeetingResultPage() {
  const router = useRouter();
  const meetingId = router.query.id as string;

  const { data: meetingInfo, isLoading } = useGetMeeting(meetingId);

  if (!meetingInfo) return;

  const {
    id,
    title,
    timeRange: [startTime, endTime],
    date: dateInfo,
    memberCount,
  } = meetingInfo;

  const { month, date, day } = extractDatePartsFromStringType(dateInfo);

  return (
    <CommonLayout>
      {isLoading && <Spinner />}
      <MeetingInfoContainer
        mainTitle="일정이 생성되었습니다 🎉"
        meetingInfo={meetingInfo}
      />
      <S.ButtonWrapper>
        <KakaoShareButton
          size="md"
          clickHandler={() =>
            Kakao.share(102017, {
              id,
              title,
              memberCount,
              startTime,
              endTime,
              date: `${month}월 ${date}일 (${DAYS_OF_WEEK_KO[day]})`,
            })
          }
        />
        <S.ButtonLink href={ROUTE_PATH.SCHEDULE_LOGIN(id)}>
          내 스케줄 등록하기
        </S.ButtonLink>
      </S.ButtonWrapper>
    </CommonLayout>
  );
}
