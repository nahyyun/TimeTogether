import Tab from "./Tab";
import { Tab as TabType } from "./tabs.type";

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
    <>
      {tabsInfo.map((tabInfo, idx) => (
        <Tab
          key={idx}
          tabInfo={tabInfo}
          activeTab={activeTab}
          onChange={onChange}
        />
      ))}
    </>
  );
}
