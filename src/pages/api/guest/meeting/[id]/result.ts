import { getMeetingInfo } from "@/backend/services/meeting";
import {
  getUpdatedCandidates,
  mapMembersToTimeSlots,
  sortCandidatesByMultipleFactors,
} from "@/backend/utils/schedule";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  const meetingId = id as string;

  const { data: meetingInfo, error } = await getMeetingInfo(meetingId);

  if (error) {
    return res.status(500).json({ message: error.message });
  }

  if (!meetingInfo)
    return res.status(404).json({ message: "NOT_FOUND_MEETING" });

  const { members } = meetingInfo;

  const updatedCandidates = getUpdatedCandidates(members);

  const mappedMembersByTimeSlots = mapMembersToTimeSlots(updatedCandidates);
  const sortedCandidates = sortCandidatesByMultipleFactors(updatedCandidates);

  const isSingleMember = meetingInfo.members.length === 1;

  const bestCandidatesEndIdx = isSingleMember
    ? sortedCandidates.length - 1
    : sortedCandidates.findIndex(
        ({ members }) => members.length !== meetingInfo.members.length
      ) - 1;

  const hasBestCandidates = isSingleMember || !!(bestCandidatesEndIdx >= 0);

  return res.status(200).json({
    ...meetingInfo,
    hasBestCandidates,
    candidates: {
      bestCandidates: hasBestCandidates
        ? sortedCandidates.splice(0, Math.min(bestCandidatesEndIdx + 1, 5))
        : [],
      otherCandidates: sortedCandidates.splice(0, 5),
    },

    schedule: mappedMembersByTimeSlots,
  });
}
