import { useState } from "react";
import TabList from "@/components/TabList";
import { Tab } from "@/components/TabList/tabs.type";
import { RESULT_TABS_INFO } from "@/constants/resultTab";
import { useGetScheduleResult } from "@/hooks/queries/schedule";
import { useRouter } from "next/router";
import * as S from "./style";
import {
  ScheduleResultContainer,
  TimeResultContainer,
} from "@/components/ResultContainer";

export default function ScheduleResultPage() {
  const [activeTab, setActiveTab] = useState(RESULT_TABS_INFO[1].value);

  const router = useRouter();

  const meetingId = router.query.id as string | undefined;

  const { data: meetingInfo, error } = useGetScheduleResult(meetingId);

  if (!meetingInfo) return;

  const {
    date,
    hasBestCandidates,
    candidates: { bestCandidates, otherCandidates },
  } = meetingInfo;

  const onChangeActiveTab = (tab: Tab["value"]) => {
    setActiveTab(tab);
  };

  const renderComponentForTab = (activeTab: string) => {
    switch (activeTab) {
      case RESULT_TABS_INFO[0].value:
        return <ScheduleResultContainer meetingInfo={meetingInfo} />;

      case RESULT_TABS_INFO[1].value:
        return (
          <S.PriorityResultWrapper>
            {hasBestCandidates ? (
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
            )}
            ;
          </S.PriorityResultWrapper>
        );
    }
  };

  return (
    <S.ResultPageLayout>
      <TabList
        tabsInfo={RESULT_TABS_INFO}
        activeTab={activeTab}
        onChange={onChangeActiveTab}
      />
      {renderComponentForTab(activeTab)}
    </S.ResultPageLayout>
  );
}
