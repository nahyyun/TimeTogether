import ScheduleTable from "@/components/ScheduleTable";
import TabList from "@/components/TabList";
import { Tab } from "@/components/TabList/tabs.type";
import { RESULT_TABS_INFO } from "@/constants/resultTab";
import { useGetMeeting } from "@/hooks/queries/meeting";
import {
  createTimeMembersMap,
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

  const timeMembersMap = createTimeMembersMap(candidates);

  const [startTime, endTime] = meetingInfo.timeRange;

  const allTimeRange = getAllTimeRange(startTime, endTime);
  const timeTableValues = getTimeTableValues(allTimeRange);

  const onChangeActiveTab = (tab: Tab["value"]) => {
    setActiveTab(tab);
  };

  return (
    <>
      <TabList
        tabsInfo={RESULT_TABS_INFO}
        activeTab={activeTab}
        onChange={onChangeActiveTab}
      />

      <p>
        현재까지 {memberCount} 중 {members.length}명이 참여했어요 !
      </p>

      {activeTab === RESULT_TABS_INFO[0].value && (
        <ScheduleTable
          meetingInfo={meetingInfo}
          allTimeRange={allTimeRange}
          timeTableValues={timeTableValues}
        />
      )}
    </>
  );
}
