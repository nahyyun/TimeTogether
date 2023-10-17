import { createMeeting } from "@/services/meeting";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const meetingFormData = JSON.parse(req.body);

  const { data, error } = await createMeeting({
    ...meetingFormData,
    members: [],
    isMemberCountDecided: true,
  });

  if (error)
    return res.status(Number(error.code)).json({ message: error.message });

  return res.status(200).json({ data });
}
