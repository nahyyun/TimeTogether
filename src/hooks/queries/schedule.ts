import { CandidateTimeInfo } from "@/types/candidateTime";
import { apiService } from "@/api/apiService";
import { END_POINT } from "@/constants/api";
import { ROUTE_PATH } from "@/constants/path";
import { Meeting, ScheduleForm } from "@/types/meeting";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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

    onSuccess: ({ meetingId, userName }) => {
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
    cacheTime: 0,
  });
};

const useUpdatePersonalSchedule = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: ({
      meetingId,
      scheduleForm,
    }: {
      meetingId: string;
      scheduleForm: ScheduleForm;
    }) => apiService.put(END_POINT.GUEST_SCHEDULE(meetingId), scheduleForm),

    onMutate: async ({ meetingId, scheduleForm }) => {
      await queryClient.cancelQueries({
        queryKey: ["meeting", "schedule", meetingId, scheduleForm.name],
      });

      const prevPersonalSchedule = queryClient.getQueryData([
        "meeting",
        "schedule",
        meetingId,
        scheduleForm.name,
      ]) as { [key: string]: boolean };

      queryClient.setQueryData<{ schedule: { [key: string]: boolean } }>(
        ["meeting", "schedule", meetingId, scheduleForm.name],
        () => {
          const updatedSchedule = scheduleForm.schedule.reduce(
            (scheduleMap: { [key: string]: boolean }, time) => {
              scheduleMap[time] = true;

              return scheduleMap;
            },
            {}
          );

          return {
            schedule: updatedSchedule,
          };
        }
      );

      return { prevPersonalSchedule };
    },
    onError: (err, { meetingId, scheduleForm }, context) => {
      queryClient.setQueryData(
        ["meeting", "schedule", meetingId, scheduleForm.name],
        context?.prevPersonalSchedule
      );
    },

    onSettled: (data, err, { meetingId, scheduleForm }) => {
      queryClient.invalidateQueries({
        queryKey: ["meeting", "schedule", meetingId, scheduleForm.name],
      });
    },
    onSuccess: ({ meetingId }) => {
      router.push(ROUTE_PATH.RESULT(meetingId));
    },
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
