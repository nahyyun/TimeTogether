import { GuestUser } from "./user";

export interface Meeting {
  title: string;
  date: string;
  memberCnt?: string;
  isMemberCntDecided: boolean;
  timeRange: string[];
  members: GuestUser[];
}

export interface MeetingFormFields {
  title: string;
  memberCnt?: number;
  time: string;
}

export type MeetingFormRefType = {
  [key in keyof MeetingFormFields]: HTMLInputElement | null;
};
