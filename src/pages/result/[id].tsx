import { useState } from "react";
import AvatarGroup from "@/components/Common/AvatarGroup";
import ScheduleTable from "@/components/ScheduleTable";
import TabList from "@/components/TabList";
import { Tab } from "@/components/TabList/tabs.type";
import { RESULT_TABS_INFO } from "@/constants/resultTab";
import { useGetScheduleResult } from "@/hooks/queries/schedule";
import { getAllTimeRange, getTimeTableValues } from "@/utils/time";
import { ROUTE_PATH } from "@/constants/path";
import { useRouter } from "next/router";
import TimeResultContainer from "@/components/ResultContainer/TimeResultContainer";
import * as S from "./style";

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
            <TimeResultContainer
              headTitle="모두가 가능한 시간대는 아래와 같아요."
              desc="* 오래 만날 수 있는 순 > 빠른 모임 시간 순으로 나타냈어요."
              list={bestCandidates}
              date={date}
            />
          ) : (
            <TimeResultContainer
              headTitle={`❗️ 모두가 가능한 모임 시간은 없지만 \n 아래 모임 시간은 어때요?`}
              desc="* 참여 가능한 사람이 많은 순 > 오래 만날 수 있는 순 > 빠른 모임 시간 순으로 나타냈어요."
              list={otherCandidates}
              date={date}
            />
          ))}
      </S.PriorityResultWrapper>
    </S.ResultPageLayout>
  );
}
