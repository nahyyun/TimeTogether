import Tab from "./Tab";
import { Tab as TabType } from "./tabs.type";
import * as S from "./style";

interface TabListProps {
  tabsInfo: TabType[];
  activeTab: TabType["label"];
  onChange: (tab: TabType["value"]) => void;
}

export default function TabList({
  tabsInfo,
  activeTab,
  onChange,
}: TabListProps) {
  return (
    <S.TabList>
      {tabsInfo.map((tabInfo, idx) => (
        <Tab
          key={idx}
          tabInfo={tabInfo}
          activeTab={activeTab}
          onChange={onChange}
        />
      ))}
      <S.HighLighter
        activeTabIdx={tabsInfo.findIndex(({ value }) => value === activeTab)}
      />
    </S.TabList>
  );
}
