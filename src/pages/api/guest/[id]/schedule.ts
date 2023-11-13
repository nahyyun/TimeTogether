import { createSchedule } from "@/services/schedule";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const scheduleFormData = JSON.parse(req.body);
  const { id: meetingId } = req.query;

  const { error } = await createSchedule(meetingId as string, scheduleFormData);

  if (error)
    return res.status(Number(error.code)).json({ message: error.message });

  return res.status(200);
}
