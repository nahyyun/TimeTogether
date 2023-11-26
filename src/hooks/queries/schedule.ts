import { CandidateTimeInfo } from "@/types/candidateTime";
import { apiService } from "@/api/apiService";
import { END_POINT } from "@/constants/api";
import { ROUTE_PATH } from "@/constants/path";
import { Meeting, ScheduleForm } from "@/types/meeting";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const useCreateSchedule = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: ({
      meetingId,
      scheduleForm,
    }: {
      meetingId: string;
      scheduleForm: ScheduleForm;
    }) => apiService.post(END_POINT.GUEST_SCHEDULE(meetingId), scheduleForm),

    onSuccess: ({
      meetingId,
      userName,
    }: {
      meetingId: string;
      userName: string;
    }) => {
      localStorage.setItem("userName", JSON.stringify(userName));
      router.push(ROUTE_PATH.RESULT(meetingId));
    },
    onError: (error) => console.error(error),
  });
};

const useGetPersonalSchedule = (meetingId: string, name: string) => {
  return useQuery({
    queryKey: ["meeting", "schedule", meetingId, name],
    queryFn: () =>
      apiService.get<{
        schedule: {
          [key: string]: boolean;
        };
      }>(END_POINT.GUEST_SCHEDULE(meetingId, name)),
    enabled: !!name,
  });
};

const useUpdatePersonalSchedule = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: ({
      meetingId,
      scheduleForm,
    }: {
      meetingId: string;
      scheduleForm: ScheduleForm;
    }) => apiService.put(END_POINT.GUEST_SCHEDULE(meetingId), scheduleForm),

    onSuccess: ({ meetingId }: { meetingId: string; userName: string }) => {
      router.push(ROUTE_PATH.RESULT(meetingId));
    },
    onError: (error) => console.error(error),
  });
};

export type ResultResponseDataType = Meeting & {
  schedule: {
    [key: string]: string[];
  };
  hasBestCandidates: boolean;
  candidates: {
    bestCandidates: CandidateTimeInfo[];
    otherCandidates: CandidateTimeInfo[];
  };
};

const useGetScheduleResult = (meetingId: string) => {
  return useQuery({
    queryKey: ["meeting", "schedule", meetingId],
    queryFn: () =>
      apiService.get<ResultResponseDataType>(
        END_POINT.GUEST_SCHEDULE_RESULT(meetingId)
      ),
  });
};

export {
  useCreateSchedule,
  useGetPersonalSchedule,
  useUpdatePersonalSchedule,
  useGetScheduleResult,
};
