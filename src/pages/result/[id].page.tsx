import { useState } from "react";
import TabList from "@/components/TabList";
import { Tab } from "@/components/TabList/tabs.type";
import { RESULT_TABS_INFO } from "@/constants/resultTab";
import {
  ResultResponseDataType as MeetingInfo,
  useGetScheduleResult,
} from "@/hooks/queries/schedule";
import { useRouter } from "next/router";
import * as S from "./style";
import {
  ScheduleResultContainer,
  TimeResultContainer,
} from "@/components/ResultContainer";
import Spinner from "@/components/Common/Spinner";
import { hasParticipants } from "@/utils/typeGuard";

export default function ScheduleResultPage() {
  const [activeTab, setActiveTab] = useState(RESULT_TABS_INFO[0].value);

  const router = useRouter();
  const meetingId = router.query.id as string | undefined;

  const { data: meetingInfo, isFetching } = useGetScheduleResult(meetingId);

  const onChangeActiveTab = (tab: Tab["value"]) => {
    setActiveTab(tab);
  };

  const renderComponentForTab = (
    activeTab: string,
    meetingInfo: MeetingInfo
  ) => {
    const { id, title, date } = meetingInfo;

    switch (activeTab) {
      case RESULT_TABS_INFO[0].value:
        return <ScheduleResultContainer meetingInfo={meetingInfo} />;

      case RESULT_TABS_INFO[1].value: {
        if (!hasParticipants(meetingInfo))
          return (
            <div>
              <S.Heading>등록된 스케줄이 없어요!</S.Heading>
              <S.SubDesc>스케줄을 먼저 등록해주세요.</S.SubDesc>
            </div>
          );

        const {
          hasBestCandidates,
          candidates: { bestCandidates, otherCandidates },
        } = meetingInfo;

        return (
          <div>
            {hasBestCandidates ? (
              <TimeResultContainer
                headTitle="모두가 가능한 시간대는 아래와 같아요."
                desc="* 오래 만날 수 있는 순 > 빠른 모임 시간 순으로 나타냈어요."
                list={bestCandidates}
                subInfo={{ id, title, date }}
              />
            ) : (
              <TimeResultContainer
                headTitle={`❗️ 모두가 가능한 모임 시간은 없지만 \n 아래 모임 시간은 어때요?`}
                desc="* 참여 가능한 사람이 많은 순 > 오래 만날 수 있는 순 > 빠른 모임 시간 순으로 나타냈어요."
                list={otherCandidates}
                subInfo={{ id, title, date }}
              />
            )}
          </div>
        );
      }
    }
  };

  return (
    <S.Layout>
      <TabList
        tabsInfo={RESULT_TABS_INFO}
        activeTab={activeTab}
        onChange={onChangeActiveTab}
      />
      <S.ContentLayout>
        {isFetching ? (
          <Spinner />
        ) : (
          meetingInfo && renderComponentForTab(activeTab, meetingInfo)
        )}
      </S.ContentLayout>
    </S.Layout>
  );
}
