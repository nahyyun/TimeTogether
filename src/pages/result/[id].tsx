import AvatarGroup from "@/components/Common/AvatarGroup";
import ScheduleTable from "@/components/ScheduleTable";
import TabList from "@/components/TabList";
import { Tab } from "@/components/TabList/tabs.type";
import { RESULT_TABS_INFO } from "@/constants/resultTab";
import { useGetScheduleResult } from "@/hooks/queries/schedule";
import { getAllTimeRange, getTimeTableValues } from "@/utils/time";
import { ROUTE_PATH } from "@/constants/path";
import { useRouter } from "next/router";
import { useState } from "react";
import * as S from "./style";
import { PiClockThin } from "react-icons/pi";
import { PiClockLight } from "react-icons/pi";
import { PiUsersThreeLight } from "react-icons/pi";
import { daysOfWeek } from "@/constants/day";
import Button from "@/components/Common/Button";

export default function ScheduleResultPage() {
  const [activeTab, setActiveTab] = useState(RESULT_TABS_INFO[1].value);

  const router = useRouter();

  const meetingId = router.query.id as string | undefined;

  const { data: meetingInfo, error } = useGetScheduleResult(meetingId);

  if (!meetingInfo) return;

  const {
    date,
    memberCount,
    members,
    hasBestCandidates,
    candidates: { bestCandidates, otherCandidates },
    schedule,
  } = meetingInfo;

  const [startTime, endTime] = meetingInfo.timeRange;

  const allTimeRange = getAllTimeRange(startTime, endTime);
  const timeTableValues = getTimeTableValues(allTimeRange);

  const onChangeActiveTab = (tab: Tab["value"]) => {
    setActiveTab(tab);
  };

  const availableTotalMemberCnt = members.length;

  return (
    <S.ResultPageLayout>
      <TabList
        tabsInfo={RESULT_TABS_INFO}
        activeTab={activeTab}
        onChange={onChangeActiveTab}
      />

      {activeTab === RESULT_TABS_INFO[0].value && (
        <>
          <S.ParticipationInfoWrapper>
            <h4>참여 인원</h4>
            <S.ParticipationInfo>
              <AvatarGroup list={members} max={6} />
              <S.MemberCountInfo>
                <S.AvailableMemberCount>
                  {availableTotalMemberCnt}
                </S.AvailableMemberCount>
                <S.ToTalMemberCount> / {memberCount}명</S.ToTalMemberCount>
              </S.MemberCountInfo>
            </S.ParticipationInfo>
          </S.ParticipationInfoWrapper>
          <ScheduleTable
            meetingInfo={meetingInfo}
            allTimeRange={allTimeRange}
            timeTableValues={timeTableValues}
            mappedMembersByTimeSlots={schedule}
            availableTotalMemberCnt={availableTotalMemberCnt}
          />

          <S.ButtonLink
            href={ROUTE_PATH.SCHEDULE_LOGIN(meetingId)}
            buttonstyle="secondary"
            size="full"
          >
            내 스케줄 등록하기
          </S.ButtonLink>
        </>
      )}

      <S.PriorityResultWrapper>
        {activeTab === RESULT_TABS_INFO[1].value &&
          (hasBestCandidates ? (
            <>
              <S.Heading>모두가 가능한 시간대는 아래와 같아요.</S.Heading>
              <S.CardList>
                {bestCandidates.map(({ startTime, endTime, members }, idx) => (
                  <S.Card key={idx}>
                    <PiClockThin />
                    {startTime} ~ {endTime} {members.length}명
                  </S.Card>
                ))}
              </S.CardList>
            </>
          ) : (
            <>
              <S.Heading>
                ❗️ 모두가 가능한 모임 시간은 없지만 <br /> 아래 모임 시간은
                어때요?
              </S.Heading>
              <S.ResultDesc>
                * 참여 가능한 사람이 많은 순 {">"} 오래 만날 수 있는 순 {">"}
                빠른 모임 시간 순으로 나타냈어요.
              </S.ResultDesc>
              <S.CardList>
                {otherCandidates.map(({ startTime, endTime, members }, idx) => (
                  <S.Card key={idx}>
                    <S.DateInfo>
                      <S.Day>
                        {daysOfWeek[new Date(date).getDay()].slice(0, 3)}
                      </S.Day>
                      <S.Date>{new Date(date).getDate()}</S.Date>
                    </S.DateInfo>
                    <div>
                      <S.TimeInfo>
                        <PiClockLight size={22} color="#5EC0C3" />
                        {startTime} - {endTime}
                      </S.TimeInfo>
                      <S.MemberInfoWrapper>
                        <PiUsersThreeLight size={20} color="#5EC0C3" />
                        <S.MemberInfo>
                          <AvatarGroup
                            list={members}
                            max={4}
                            avatarSize={"sm"}
                          />
                          <S._MemberCountInfo>
                            {members.length} 명
                          </S._MemberCountInfo>
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
          ))}
      </S.PriorityResultWrapper>
    </S.ResultPageLayout>
  );
}
