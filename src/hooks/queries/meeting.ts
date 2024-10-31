import { useContext } from "react";
import { apiService } from "@/api/apiService";
import { END_POINT } from "@/constants/api";
import { ROUTE_PATH } from "@/constants/path";
import { Meeting, MeetingInsert } from "@/types/meeting";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { SnackbarContext } from "@/contexts/SnackbarContext";
import { SUCCESS_MESSAGE } from "@/constants/message";

const useCreateMeeting = () => {
  const router = useRouter();
  const { openSnackbar } = useContext(SnackbarContext);

  return useMutation({
    mutationFn: (meetingForm: MeetingInsert) =>
      apiService.post(END_POINT.GUEST_MEETING.BASE, meetingForm),

    onSuccess: ({ meetingId }: { meetingId: string }) => {
      localStorage.removeItem("userName");
      router.push(ROUTE_PATH.RESULT_OF_MAKE_MEETING(meetingId));

      openSnackbar(SUCCESS_MESSAGE.CREATE_MEETING);
    },
  });
};

const useGetMeeting = (meetingId?: string) => {
  return useQuery<Meeting>({
    queryKey: ["meeting", meetingId],
    queryFn: () => apiService.get(END_POINT.GUEST_MEETING.BY_ID(meetingId)),
    enabled: !!meetingId,
    cacheTime: 0,
  });
};
export { useCreateMeeting, useGetMeeting };
