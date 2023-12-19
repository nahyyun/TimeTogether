import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { ParsedUrlQuery } from "querystring";
import { Meeting } from "@/types/meeting";
import { ROUTE_PATH } from "@/constants/path";
import Button from "@/components/Common/Button";
import * as S from "./style";
import { getMeetingInfo } from "@/backend/services/meeting";
import MeetingInfoContainer from "@/components/MeetingInfoContainer";
import { Kakao } from "@/utils/kakao";

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
    date,
    memberCount,
  } = meetingInfo;

  return (
    <MeetingInfoContainer
      mainTitle="일정이 생성되었습니다 🎉"
      meetingInfo={meetingInfo}
    >
      <S.ButtonWrapper>
        <Button
          buttonstyle="secondary"
          onClick={() =>
            Kakao.share(102017, {
              id,
              title,
              memberCount,
              startTime,
              endTime,
              date,
            })
          }
        >
          일정 공유하기
        </Button>
        <S.ButtonLink href={ROUTE_PATH.SCHEDULE_LOGIN(id)}>
          내 스케줄 등록하기
        </S.ButtonLink>
      </S.ButtonWrapper>
    </MeetingInfoContainer>
  );
}
