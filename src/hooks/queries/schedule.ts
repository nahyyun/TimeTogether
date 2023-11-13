import { apiService } from "@/api/apiService";
import { END_POINT } from "@/constants/api";
import { ROUTE_PATH } from "@/constants/path";
import { ScheduleForm } from "@/types/meeting";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";

const useCreateSchedule = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: ({
      meetingId,
      scheduleForm: scheduleForm,
    }: {
      meetingId: string;
      scheduleForm: ScheduleForm;
    }) => apiService.post(END_POINT.GUEST_SCHEDULE(meetingId), scheduleForm),

    onSuccess: ({ meetingId }: { meetingId: string }) =>
      router.push(ROUTE_PATH.RESULT(meetingId)),

    onError: (error) => console.error(error),
  });
};

export { useCreateSchedule };
