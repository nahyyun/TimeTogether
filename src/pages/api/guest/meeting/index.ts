import { createMeeting } from "@/backend/services/meeting";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const meetingFormData = JSON.parse(req.body);

  const { data, error } = await createMeeting(meetingFormData);

  if (error)
    return res.status(Number(error.code)).json({ message: error.message });

  return res.status(200).json({ meetingId: data[0].id });
}
