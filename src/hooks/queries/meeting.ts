import { apiService } from "@/api/apiService";
import { END_POINT } from "@/constants/api";
import { ROUTE_PATH } from "@/constants/path";
import { MeetingForm } from "@/types/meeting";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";

const useCreateMeeting = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (
      meetingFormData: Omit<MeetingForm, "timeRange"> & {
        timeRange: [string, string];
      }
    ) => apiService.post(END_POINT.GUEST_MEETING, meetingFormData),

    onSuccess: ({ meetingId }: { meetingId: number }) =>
      router.push(ROUTE_PATH.MAKE_MEETING_RESULT(meetingId)),

    onError: (error) => console.error(error),
  });
};

export { useCreateMeeting };
