import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { ParsedUrlQuery } from "querystring";
import { Meeting } from "@/types/meeting";
import { ROUTE_PATH } from "@/constants/path";
import { getMeetingInfo } from "@/backend/services/meeting";
import MeetingInfoContainer from "@/components/MeetingInfoContainer";
import * as S from "./style";
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

export default function InvitePage({
  meetingInfo: { id, ...rest },
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <CommonLayout>
      <MeetingInfoContainer
        mainTitle={"💌 초대장 💌"}
        meetingInfo={{ id, ...rest }}
      ></MeetingInfoContainer>
      <S.ButtonLink href={ROUTE_PATH.SCHEDULE_LOGIN(id)} size="full-width">
        내 스케줄 등록하기
      </S.ButtonLink>
    </CommonLayout>
  );
}
