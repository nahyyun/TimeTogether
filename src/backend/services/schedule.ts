import { Json } from "@/types/supabase";
import supabase from "./init";

export const createSchedule = (
  meetingId: string,
  personalScheduleForm: Json
) => {
  return supabase.rpc("add_member", {
    meeting_id: meetingId,
    member_data: personalScheduleForm,
  });
};

export const updateSchedule = (
  meetingId: string,
  userName: string,
  schedule: string[]
) => {
  return supabase.rpc("update_member_schedule_data", {
    meeting_id: meetingId,
    member_name: userName,
    schedule: schedule,
  });
};
