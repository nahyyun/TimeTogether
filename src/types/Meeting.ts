import { meetingInputRefsDefaultValue } from "@/constants/stateDefaultValue";
import { Row, RowInsert } from "./supabase";

export interface Meeting extends Row<"Meeting"> {}
export interface MeetingInsert extends RowInsert<"Meeting"> {}

export type MeetingInputRefs = {
  [key in keyof typeof meetingInputRefsDefaultValue]: HTMLInputElement | null;
};

export interface ScheduleForm {
  name: string;
  schedule: string[];
}
