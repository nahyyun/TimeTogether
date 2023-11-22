import AvatarGroup from "@/components/Common/AvatarGroup";
import Button from "@/components/Common/Button";
import { ClockIcon, UsersIcon } from "@/components/UI/Icons";
import { daysOfWeek } from "@/constants/day";
import { CandidateTimeInfo } from "@/types/candidateTime";
import * as S from "./style";

interface TimeResultContainerProps {
  headTitle: string;
  desc: string;
  list: CandidateTimeInfo[];
  date: string;
}

export default function TimeResultContainer({
  headTitle,
  desc,
  list,
  date: dateInfo,
}: TimeResultContainerProps) {
  const dateInstance = new Date(dateInfo);
  const date = dateInstance.getDate();
  const day = dateInstance.getDay();

  return (
    <>
      <S.Heading>{headTitle}</S.Heading>
      <S.ResultDesc>{desc}</S.ResultDesc>
      <S.CardList>
        {list.map(({ startTime, endTime, members }, idx) => (
          <S.Card key={idx}>
            <S.DateInfo>
              <S.Day>{daysOfWeek[day].slice(0, 3)}</S.Day>
              <S.Date>{date}</S.Date>
            </S.DateInfo>
            <div>
              <S.TimeInfo>
                <ClockIcon />
                {startTime} - {endTime}
              </S.TimeInfo>
              <S.MemberInfoWrapper>
                <UsersIcon />
                <S.MemberInfo>
                  <AvatarGroup list={members} max={4} avatarSize="sm" />
                  <S.MemberCountInfo>{members.length}명</S.MemberCountInfo>
                </S.MemberInfo>
              </S.MemberInfoWrapper>
            </div>
          </S.Card>
        ))}
      </S.CardList>
      <Button type="button" size="full-width">
        결과 공유하기
      </Button>
    </>
  );
}
