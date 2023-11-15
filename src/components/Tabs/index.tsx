import { useState } from "react";
import TabList from "./TabList";
import { Tab } from "./tabs.type";

interface TabProps {
  tabsInfo: Tab[];
}

export default function Tabs({ tabsInfo }: TabProps) {
  const [activeTab, setActiveTab] = useState(tabsInfo[0].value);

  const onChangeActiveTab = (tab: Tab["value"]) => {
    setActiveTab(tab);
  };

  return (
    <TabList
      tabsInfo={tabsInfo}
      activeTab={activeTab}
      onChange={onChangeActiveTab}
    />
  );
}
