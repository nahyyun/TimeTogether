import { getMeetingInfo } from "@/backend/services/meeting";
import { NextApiRequest, NextApiResponse } from "next";

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

  return res.status(200).json({ ...meetingInfo });
}
