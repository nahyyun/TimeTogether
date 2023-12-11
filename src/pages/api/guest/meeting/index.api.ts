import { createMeeting } from "@/backend/services/meeting";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const meetingFormData = JSON.parse(req.body);

  const { data, error } = await createMeeting(meetingFormData);

  if (error) return res.status(500).json({ message: error.message });

  return res.status(200).json({ meetingId: data?.id });
}
