import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { ParsedUrlQuery } from "querystring";
import { Meeting } from "@/types/meeting";
import { extractDatePartsFromStringType } from "@/utils/date";
import { ROUTE_PATH } from "@/constants/path";
import Button from "@/components/Common/Button";
import * as S from "./style";
import { getMeetingInfo } from "@/backend/services/meeting";
import { UsersIcon } from "@/components/UI/Icons";

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
  meetingInfo: {
    id,
    title,
    timeRange: [startTime, endTime],
    date: dateData,
    memberCount,
  },
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { year, month, date } = extractDatePartsFromStringType(dateData);

  return (
    <S.MeetingResultWrapper>
      <S.MainTitle>일정이 생성되었습니다 🎉</S.MainTitle>
      <S.MeetingInfoWrapper>
        <S.MeetingTitle>{title}</S.MeetingTitle>
        <div>
          <span>{year}년 </span>
          <strong>{month}</strong>월 <strong>{date}</strong>일
        </div>
        <strong>
          ⏱ {startTime} ~ {endTime} ⏱
        </strong>
        <S.MemberInfo>
          <UsersIcon color="secondary" />
          {memberCount}명
        </S.MemberInfo>
      </S.MeetingInfoWrapper>
      <S.ButtonWrapper>
        <Button buttonstyle="secondary">일정 공유하기</Button>
        <S.ButtonLink href={ROUTE_PATH.SCHEDULE_LOGIN(id)}>
          내 일정 등록하기
        </S.ButtonLink>
      </S.ButtonWrapper>
    </S.MeetingResultWrapper>
  );
}
