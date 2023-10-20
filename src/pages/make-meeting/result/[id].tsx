import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { getMeetingInfo } from "@/services/meeting";
import { ParsedUrlQuery } from "querystring";
import { Meeting } from "@/types/meeting";
import { extractDatePartsFromStringType } from "@/utils/date";
import Button from "@/components/Common/Button";
import * as S from "./style";

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

  if (!data)
    return {
      notFound: true,
    };

  return { props: { meetingInfo: data[0] } };
};

export default function MakeMeetingResultPage({
  meetingInfo: {
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
        <span>{memberCount}명</span>
      </S.MeetingInfoWrapper>
      <S.ButtonWrapper>
        <Button>일정 공유하기</Button>
        <Button>내 일정 등록하기</Button>
      </S.ButtonWrapper>
    </S.MeetingResultWrapper>
  );
}
