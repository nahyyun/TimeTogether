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
      size="full"
      buttonstyle="none"
      className={activeTab === value ? "active-tab" : "inactive-tab"}
      onClick={() => onChange(value)}
    >
      <span>{label}</span>
    </Button>
  );
}
