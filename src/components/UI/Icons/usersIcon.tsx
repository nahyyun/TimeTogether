import { theme } from "@/styles/theme";
import { PiUsersThreeLight } from "react-icons/pi";

const UsersIconColor = {
  primary: theme.colors.primary[200],
  secondary: theme.colors.gray[300],
};

interface UsersIconProps {
  size?: number;
  color?: keyof typeof UsersIconColor;
}

export default function UsersIcon({
  size = 20,
  color = "primary",
}: UsersIconProps) {
  return <PiUsersThreeLight size={size} color={UsersIconColor[color]} />;
}
