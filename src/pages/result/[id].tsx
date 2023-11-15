import Tabs from "@/components/Tabs";
import { RESULT_TAB_INFO } from "@/constants/resultTab";
import { useRouter } from "next/router";

export default function ScheduleResultPage() {
  const router = useRouter();

  const meetingId = router.query.id as string;

  return (
    <div>
      <Tabs tabsInfo={RESULT_TAB_INFO} />
    </div>
  );
}
