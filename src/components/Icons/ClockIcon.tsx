import { theme } from "@/styles/theme";
import { PiClockLight } from "react-icons/pi";

export default function clockIcon() {
  return <PiClockLight size={20} color={theme.colors.primary[200]} />;
}
