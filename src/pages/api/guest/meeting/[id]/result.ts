import { getMeetingInfo } from "@/services/meeting";
import { sortCandidatesByMultipleFactors } from "@/services/schedule";
import { mapMembersToTimeSlots } from "@/utils/time";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  const meetingId = id as string;

  const { data: meetingInfo, error } = await getMeetingInfo(meetingId);

  if (error)
    return res.status(Number(error.code)).json({ message: error.message });

  if (!meetingInfo)
    return res.status(400).json({ message: "일정 정보가 없습니다." });

  const sortedCandidates = sortCandidatesByMultipleFactors(
    meetingInfo.candidates
  );

  const mappedMembersByTimeSlots = mapMembersToTimeSlots(
    meetingInfo.candidates
  );

  return res.status(200).json({
    ...meetingInfo,
    candidates: sortedCandidates,
    schedule: mappedMembersByTimeSlots,
  });
}
