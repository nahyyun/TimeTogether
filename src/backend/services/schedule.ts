import { ScheduleForm } from "@/types/meeting";
import supabase from "./init";
import { getMeetingInfo } from "./meeting";

export const createSchedule = async (
  meetingId: string,
  personalScheduleForm: ScheduleForm
) => {
  const { data: meetingInfo, error } = await getMeetingInfo(meetingId);

  if (!meetingInfo || error) throw new Error("error");

  const { members } = meetingInfo;

  return supabase
    .from("Meeting")
    .update({
      members: [...members, personalScheduleForm],
    })
    .eq("id", meetingId);
};
