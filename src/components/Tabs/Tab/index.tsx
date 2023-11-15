import Button from "@/components/Common/Button";
import { Tab } from "../tabs.type";

interface TabProps {
  tabInfo: Tab;
  activeTab: Tab["label"];
  onChange: (tab: Tab["value"]) => void;
}

export default function Tab({
  tabInfo: { value, label },
  activeTab,
  onChange,
}: TabProps) {
  return (
    <Button
      type="button"
      buttonstyle="secondary"
      onClick={() => onChange(value)}
      isActive={activeTab === value}
    >
      <span>{label}</span>
    </Button>
  );
}
