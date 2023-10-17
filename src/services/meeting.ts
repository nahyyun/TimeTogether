import { Meeting } from "@/types/meeting";
import supabase from "./init";

export const createMeeting = (meetingData: Meeting) => {
  return supabase.from("Meeting").insert(meetingData).select("id");
};
