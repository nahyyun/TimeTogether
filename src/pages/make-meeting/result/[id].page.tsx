import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { ParsedUrlQuery } from "querystring";
import { Meeting } from "@/types/meeting";
import { ROUTE_PATH } from "@/constants/path";
import Button from "@/components/Common/Button";
import * as S from "./style";
import { getMeetingInfo } from "@/backend/services/meeting";
import MeetingInfoContainer from "@/components/MeetingInfoContainer";
import { Kakao } from "@/utils/kakao";
import { extractDatePartsFromStringType } from "@/utils/date";
import { DAYS_OF_WEEK_KO } from "@/constants/day";
import { CommonLayout } from "@/styles/commonStyle";

interface PageProps {
  meetingInfo: Meeting;
}

interface Params extends ParsedUrlQuery {
  id: string;
}

export const getServerSideProps: GetServerSideProps<PageProps, Params> = async (
  context
) => {
  const meetingId = context.params?.id || "";

  const { data, error } = await getMeetingInfo(meetingId);

  if (error) throw error;

  if (!data)
    return {
      notFound: true,
    };

  return { props: { meetingInfo: data } };
};

export default function MakeMeetingResultPage({
  meetingInfo,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
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
      <MeetingInfoContainer
        mainTitle="일정이 생성되었습니다 🎉"
        meetingInfo={meetingInfo}
      />
      <S.ButtonWrapper>
        <Button
          type="button"
          buttonstyle="secondary"
          onClick={() =>
            Kakao.share(102017, {
              id,
              title,
              memberCount,
              startTime,
              endTime,
              date: `${month}월 ${date}일 (${DAYS_OF_WEEK_KO[day]})`,
            })
          }
        >
          일정 공유하기
        </Button>
        <S.ButtonLink href={ROUTE_PATH.SCHEDULE_LOGIN(id)}>
          내 스케줄 등록하기
        </S.ButtonLink>
      </S.ButtonWrapper>
    </CommonLayout>
  );
}
