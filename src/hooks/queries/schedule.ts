import { SUCCESS_MESSAGE } from "@/constants/message";
import { CandidateTimeInfo } from "@/types/candidateTime";
import { apiService } from "@/api/apiService";
import { END_POINT } from "@/constants/api";
import { ROUTE_PATH } from "@/constants/path";
import { Meeting, ScheduleForm } from "@/types/meeting";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useContext } from "react";
import { SnackbarContext } from "@/contexts/SnackbarContext";

const useCreateSchedule = () => {
  const router = useRouter();
  const { openSnackbar } = useContext(SnackbarContext);

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

      openSnackbar(SUCCESS_MESSAGE.CREATE_SCHEDULE);
    },
  });
};

const useGetPersonalSchedule = (meetingId: string, name: string) => {
  return useQuery<{
    schedule: {
      [key: string]: boolean;
    };
  }>({
    queryKey: ["meeting", "schedule", meetingId, name],
    queryFn: () => apiService.get(END_POINT.GUEST_SCHEDULE(meetingId, name)),
    enabled: !!name,
    cacheTime: 0,
  });
};

const useUpdatePersonalSchedule = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { openSnackbar } = useContext(SnackbarContext);

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

    onError: (error, { meetingId, scheduleForm }, context) => {
      queryClient.setQueryData(
        ["meeting", "schedule", meetingId, scheduleForm.name],
        context?.prevPersonalSchedule
      );
      throw error;
    },

    onSettled: (data, error, { meetingId, scheduleForm }) => {
      queryClient.invalidateQueries({
        queryKey: ["meeting", "schedule", meetingId, scheduleForm.name],
      });
    },

    onSuccess: ({ meetingId }) => {
      router.push(ROUTE_PATH.RESULT(meetingId));

      openSnackbar(SUCCESS_MESSAGE.UPDATE_SCHEDULE);
    },
  });
};

export type ResultResponseWithoutParticipants = Meeting;

export type ResultResponseWithParticipants = Meeting & {
  schedule: {
    [key: string]: string[];
  };
  hasParticipants: boolean;
  hasBestCandidates: boolean;
  candidates: {
    bestCandidates: CandidateTimeInfo[];
    otherCandidates: CandidateTimeInfo[];
  };
};

export type ResultResponseDataType =
  | ResultResponseWithoutParticipants
  | ResultResponseWithParticipants;

const useGetScheduleResult = (meetingId: string | undefined) => {
  return useQuery<ResultResponseDataType>({
    queryKey: ["meeting", "schedule", meetingId],
    queryFn: () => apiService.get(END_POINT.GUEST_SCHEDULE_RESULT(meetingId)),
    enabled: !!meetingId,
    retry: false,
  });
};

export {
  useCreateSchedule,
  useGetPersonalSchedule,
  useUpdatePersonalSchedule,
  useGetScheduleResult,
};
