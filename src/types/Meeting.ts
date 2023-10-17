import {
  meetingFormDefaultValue,
  meetingInputRefsDefaultValue,
} from "@/constants/stateDefaultValue";

export interface Meeting {
  title: string;
  date: string;
  memberCount?: number;
  isMemberCountDecided: boolean;
  timeRange: string[];
  members: string[];
}

export type MeetingForm = typeof meetingFormDefaultValue;

export type MeetingInputRefs = {
  [key in keyof typeof meetingInputRefsDefaultValue]: HTMLInputElement | null;
};
