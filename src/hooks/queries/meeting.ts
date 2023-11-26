import { apiService } from "@/api/apiService";
import { getMeetingInfo } from "@/backend/services/meeting";
import { END_POINT } from "@/constants/api";
import { ROUTE_PATH } from "@/constants/path";
import { MeetingInsert } from "@/types/meeting";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const useCreateMeeting = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (meetingFormData: MeetingInsert) =>
      apiService.post(END_POINT.GUEST_MEETING, meetingFormData),

    onSuccess: ({ meetingId }: { meetingId: string }) => {
      localStorage.removeItem("userName");
      router.push(ROUTE_PATH.RESULT_OF_MAKE_MEETING(meetingId));
    },
    onError: (error) => console.error(error),
  });
};

const useGetMeeting = (meetingId: string) => {
  return useQuery({
    queryKey: ["meeting", meetingId],
    queryFn: async () => {
      const { data } = await getMeetingInfo(meetingId);

      return data;
    },
  });
};

export { useCreateMeeting, useGetMeeting };
