import { Meeting } from "@/types/meeting";
import { extractDatePartsFromStringType } from "@/utils/date";
import { UsersIcon } from "@/components/UI/Icons";
import * as S from "./style";

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
  const { year, month, date } = extractDatePartsFromStringType(dateData);

  return (
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
  );
}
