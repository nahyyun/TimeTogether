import ScheduleTable from "@/components/ScheduleTable";
import TabList from "@/components/TabList";
import { Tab } from "@/components/TabList/tabs.type";
import { RESULT_TABS_INFO } from "@/constants/resultTab";
import { useGetMeeting } from "@/hooks/queries/meeting";
import {
  mapMembersToTimeSlots,
  getAllTimeRange,
  getTimeTableValues,
} from "@/utils/time";
import { useRouter } from "next/router";
import { useState } from "react";

export default function ScheduleResultPage() {
  const [activeTab, setActiveTab] = useState(RESULT_TABS_INFO[0].value);

  const router = useRouter();
  const meetingId = router.query.id as string;

  const { data: meetingInfo, error } = useGetMeeting(meetingId);

  if (!meetingInfo) return;

  const { id, memberCount, members, candidates } = meetingInfo;

  const mappedMembersByTimeSlots = mapMembersToTimeSlots(candidates);

  const [startTime, endTime] = meetingInfo.timeRange;

  const allTimeRange = getAllTimeRange(startTime, endTime);
  const timeTableValues = getTimeTableValues(allTimeRange);

  const onChangeActiveTab = (tab: Tab["value"]) => {
    setActiveTab(tab);
  };

  const availableTotalMemberCnt = members.length;
  return (
    <>
      <TabList
        tabsInfo={RESULT_TABS_INFO}
        activeTab={activeTab}
        onChange={onChangeActiveTab}
      />

      <p>
        현재까지 {memberCount} 중 {availableTotalMemberCnt}명이 참여했어요 !
      </p>

      {activeTab === RESULT_TABS_INFO[0].value && (
        <ScheduleTable
          meetingInfo={meetingInfo}
          allTimeRange={allTimeRange}
          timeTableValues={timeTableValues}
          mappedMembersByTimeSlots={mappedMembersByTimeSlots}
          availableTotalMemberCnt={availableTotalMemberCnt}
        />
      )}

      {activeTab === RESULT_TABS_INFO[1].value && (
        <>
          <h3>모두가 가능한 시간대는 아래와 같아요.</h3>
          {/** 카드 */}
          <h3>모두가 가능한 시간대가 없어요. 😢</h3>
          <h3>추천하는 모임 시간대는 아래와 같아요.</h3>
          <span>* 참여 가능한 사람이 많은 순</span>
        </>
      )}
    </>
  );
}
