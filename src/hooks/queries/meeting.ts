import { apiService } from "@/api/apiService";
import { END_POINT } from "@/constants/api";
import { ROUTE_PATH } from "@/constants/path";
import { MeetingInsert } from "@/types/meeting";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";

const useCreateMeeting = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (meetingFormData: MeetingInsert) =>
      apiService.post(END_POINT.GUEST_MEETING, meetingFormData),

    onSuccess: ({ meetingId }: { meetingId: string }) =>
      router.push(ROUTE_PATH.MAKE_MEETING_RESULT(meetingId)),

    onError: (error) => console.error(error),
  });
};

export { useCreateMeeting };
