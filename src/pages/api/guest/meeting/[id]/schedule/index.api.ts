import { getMeetingInfo } from "@/backend/services/meeting";
import { createSchedule, updateSchedule } from "@/backend/services/schedule";
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

    if (error) return res.status(500).json({ message: error.message });

    if (!meetingInfo)
      return res.status(404).json({ message: "NOT_FOUND_MEETING" });

    const findUserIdx = meetingInfo.members.findIndex(
      (member) => member.name === userName
    );

    if (findUserIdx === -1) return res.status(200).json({ schedule: null });

    const schedule = meetingInfo.members[findUserIdx].schedule;

    return res.status(200).json({
      schedule: mapTrueToPersonalTimeSlots(genCandidateTimes(schedule)),
    });
  }

  const { name, schedule } = JSON.parse(req.body) as {
    name: string;
    schedule: string[];
  };

  // 스케줄 생성
  if (req.method === "POST") {
    const { error } = await createSchedule(meetingId, { name, schedule });
    console.log(error, "create");
    if (error) return res.status(500).json({ message: error.message });

    return res.status(200).json({ meetingId, userName: name });
  }

  // 스케줄 수정
  if (req.method === "PUT") {
    const { error } = await updateSchedule(meetingId, name, schedule);

    if (error) return res.status(500).json({ message: error.message });

    return res.status(200).json({ meetingId });
  }
}
