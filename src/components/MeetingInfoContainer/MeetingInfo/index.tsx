import { Meeting } from "@/types/meeting";
import { extractDatePartsFromStringType } from "@/utils/date";
import * as S from "./style";
import { DAYS_OF_WEEK_KO } from "@/constants/day";

interface MeetingInfoProps {
  meetingInfo: Meeting;
}

export default function MeetingInfo({
  meetingInfo: {
    title,
    date: dateData,
    timeRange: [startTime, endTime],
    memberCount,
  },
}: MeetingInfoProps) {
  const { year, month, date, day } = extractDatePartsFromStringType(dateData);

  return (
    <S.MeetingInfoWrapper>
      <S.MeetingTitle>{title}</S.MeetingTitle>
      <div>
        <span>{year}년 </span>
        <strong>{month}</strong>월 <strong>{date}</strong>일 (
        <strong>{DAYS_OF_WEEK_KO[day]}</strong>)
      </div>
      <strong>
        ⏱ {startTime} ~ {endTime} ⏱
      </strong>
      <S.MemberInfo>
        인원 <strong>{memberCount}</strong>명
      </S.MemberInfo>
    </S.MeetingInfoWrapper>
  );
}
