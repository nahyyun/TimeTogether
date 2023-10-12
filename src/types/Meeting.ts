import { GuestUser } from "./user";

export interface Meeting {
  title: string;
  date: string;
  memberCnt?: string;
  isMemberCntDecided: boolean;
  timeRange: string[];
  members: GuestUser[];
}

export interface MeetingFirstStepFormFields {
  title: string;
  memberCnt?: number;
}

export type MeetingFormRefType = {
  [key in keyof MeetingFirstStepFormFields]: HTMLInputElement | null;
};
