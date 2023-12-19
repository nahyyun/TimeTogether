import AvatarGroup from "@/components/Common/AvatarGroup";
import Button from "@/components/Common/Button";
import { ClockIcon, UsersIcon } from "@/components/Icons";
import { DAYS_OF_WEEK_EN, DAYS_OF_WEEK_KO } from "@/constants/day";
import { CandidateTimeInfo } from "@/types/candidateTime";
import { Meeting } from "@/types/meeting";
import { extractDatePartsFromStringType } from "@/utils/date";
import { Kakao } from "@/utils/kakao";
import * as S from "./style";

interface TimeResultContainerProps {
  headTitle: string;
  desc: string;
  list: CandidateTimeInfo[];
  subInfo: Pick<Meeting, "id" | "title" | "date">;
}

export default function TimeResultContainer({
  headTitle,
  desc,
  list,
  subInfo: { id, title, date: dateInfo },
}: TimeResultContainerProps) {
  const { month, date, day } = extractDatePartsFromStringType(dateInfo);

  const shareScheduleResult = ({
    results,
    id,
    title,
    dateInfo: { month, date, day },
  }: {
    results: CandidateTimeInfo[];
    id: string;
    title: string;
    dateInfo: { month: number; date: number; day: number };
  }) => {
    const dateString = `${month}월 ${date}일 (${DAYS_OF_WEEK_KO[day]})`;

    const args = results.reduce(
      (result, { startTime, endTime, members }, idx) => {
        return {
          ...result,
          [`${idx}_memberCnt`]: members.length,
          [`${idx}_info`]: `${dateString} ${startTime} ~ ${endTime}`,
        };
      },
      {}
    );

    Kakao.share(102041, {
      id,
      title,
      ...args,
    });
  };

  return (
    <>
      <S.Heading>{headTitle}</S.Heading>
      <S.ResultDesc>{desc}</S.ResultDesc>
      <S.CardList>
        {list.map(({ startTime, endTime, members }, idx) => (
          <S.Card key={idx}>
            <S.DateInfo>
              <S.Day>{DAYS_OF_WEEK_EN[day].slice(0, 3)}</S.Day>
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
      <Button
        type="button"
        size="full-width"
        onClick={() =>
          shareScheduleResult({
            id,
            title,
            dateInfo: { month, date, day },
            results: list.slice(0, 3),
          })
        }
      >
        결과 공유하기
      </Button>
    </>
  );
}
