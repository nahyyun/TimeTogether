import { meetingInputRefsDefaultValue } from "@/constants/stateDefaultValue";
import { selectedTimeInfoDefaultValue } from "@/constants/stateDefaultValue";
import { Row, RowInsert } from "./supabase";

export interface Meeting extends Row<"Meeting"> {
  members: { name: string; schedule: string[] }[];
}

export interface MeetingInsert extends RowInsert<"Meeting"> {}

export type MeetingInputRefs = {
  [key in keyof typeof meetingInputRefsDefaultValue]: HTMLInputElement | null;
};

export interface ScheduleForm {
  name: string;
  schedule: string[];
}

export type setTimeValueFnArg = {
  key: keyof typeof selectedTimeInfoDefaultValue;
  info: { idx: number; value: string };
};