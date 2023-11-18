import { Meeting } from "@/types/meeting";
import supabase from "./init";

export const createMeeting = (meetingData: Meeting) => {
  return supabase.from("Meeting").insert(meetingData).select("id");
};

export const getMeetingInfo = (meetingId: string) => {
  return supabase.from("Meeting").select().eq("id", meetingId).maybeSingle();
};