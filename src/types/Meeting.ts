import { meetingInputRefsDefaultValue } from "@/constants/defaultValue";
import { GuestUser } from "./user";

export interface Meeting {
  title: string;
  date: string;
  memberCnt?: string;
  isMemberCntDecided: boolean;
  timeRange: string[];
  members: GuestUser[];
}

export type MeetingInputRefs = {
  [key in keyof typeof meetingInputRefsDefaultValue]: HTMLInputElement | null;
};
