import { getMeetingInfo } from "@/backend/services/meeting";
import { createSchedule } from "@/backend/services/schedule";
import {
  genCandidateTimes,
  mapTrueToPersonalTimeSlots,
} from "@/backend/utils/schedule";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id, name: userName } = req.query;
  const meetingId = id as string;

  if (req.method === "GET") {
    const { data: meetingInfo, error } = await getMeetingInfo(meetingId);

    if (error)
      return res.status(Number(error.code)).json({ message: error.message });

    if (!meetingInfo)
      return res
        .status(Number(500))
        .json({ message: "일치하는 데이터가 존재하지 않습니다." });

    const findUserIdx = meetingInfo?.members.findIndex(
      (member) => member.name === userName
    );

    if (findUserIdx === -1)
      return new Error("일치하는 유저가 존재하지 않습니다.");

    const schedule = meetingInfo?.members[findUserIdx].schedule;

    return res.status(200).json({
      schedule: mapTrueToPersonalTimeSlots(genCandidateTimes(schedule)),
    });
  }

  if (req.method === "POST") {
    const scheduleFormData = JSON.parse(req.body) as {
      name: string;
      schedule: string[];
    };

    const { error } = await createSchedule(
      meetingId as string,
      scheduleFormData
    );

    if (error)
      return res.status(Number(error.code)).json({ message: error.message });

    return res.status(200).json({ meetingId, userName: scheduleFormData.name });
  }
}
