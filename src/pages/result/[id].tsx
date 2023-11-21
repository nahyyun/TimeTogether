import AvatarGroup from "@/components/Common/AvatarGroup";
import ScheduleTable from "@/components/ScheduleTable";
import TabList from "@/components/TabList";
import { Tab } from "@/components/TabList/tabs.type";
import { RESULT_TABS_INFO } from "@/constants/resultTab";
import { useGetScheduleResult } from "@/hooks/queries/schedule";
import { getAllTimeRange, getTimeTableValues } from "@/utils/time";
import { useRouter } from "next/router";
import { useState } from "react";
import * as S from "./style";

export default function ScheduleResultPage() {
  const [activeTab, setActiveTab] = useState(RESULT_TABS_INFO[0].value);

  const router = useRouter();

  const meetingId = router.query.id as string | undefined;

  const { data: meetingInfo, error } = useGetScheduleResult(meetingId);

  if (!meetingInfo) return;

  const { memberCount, members, candidates, schedule } = meetingInfo;

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
        </>
      )}

      {activeTab === RESULT_TABS_INFO[1].value && (
        <>
          <h3>모두가 가능한 시간대는 아래와 같아요.</h3>
          {candidates.map(({ startTime, endTime, members }, idx) => (
            <div key={idx}>
              {startTime} ~ {endTime} {members.length}명
            </div>
          ))}
          <h3>모두가 가능한 시간대가 없어요. 😢</h3>
          <h3>추천하는 모임 시간대는 아래와 같아요.</h3>
          <span>* 참여 가능한 사람이 많은 순</span>
        </>
      )}
    </S.ResultPageLayout>
  );
}
