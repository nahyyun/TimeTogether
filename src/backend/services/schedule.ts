import { ScheduleForm } from "@/types/meeting";
import { getUpdatedCandidates } from "../utils/schedule";
import supabase from "./init";
import { getMeetingInfo } from "./meeting";

export const createSchedule = async (
  meetingId: string,
  personalScheduleForm: ScheduleForm
) => {
  const { data: meetingInfo, error } = await getMeetingInfo(meetingId);

  if (!meetingInfo || error) throw new Error("error");

  const { candidates: currCandidateTimeInfos, members } = meetingInfo;

  const updatedCandidates = getUpdatedCandidates(
    personalScheduleForm,
    currCandidateTimeInfos
  );

  return supabase
    .from("Meeting")
    .update({
      candidates: updatedCandidates,
      members: [...members, personalScheduleForm.name],
    })
    .eq("id", meetingId);
};
