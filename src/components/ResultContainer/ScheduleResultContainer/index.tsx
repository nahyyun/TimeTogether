import AvatarGroup from "@/components/Common/AvatarGroup";
import ScheduleTable from "@/components/ScheduleTable";
import { ROUTE_PATH } from "@/constants/path";
import { ResultResponseDataType as MeetingInfo } from "@/hooks/queries/schedule";
import { getAllTimeRange, getTimeTableValues } from "@/utils/time";
import { hasParticipants } from "@/utils/typeGuard";
import * as S from "./style";

interface ScheduleResultContainerProps {
  meetingInfo: MeetingInfo;
}

export default function ScheduleResultContainer({
  meetingInfo,
}: ScheduleResultContainerProps) {
  const { id: meetingId, memberCount, members } = meetingInfo;

  const [startTime, endTime] = meetingInfo.timeRange;

  const allTimeRange = getAllTimeRange(startTime, endTime);
  const timeTableValues = getTimeTableValues(allTimeRange);

  const availableTotalMemberCnt = members.length;

  return (
    <S.ParticipationInfoWrapper>
      <S.Heading>참여 인원</S.Heading>
      <S.ParticipationInfo>
        <AvatarGroup list={members} max={6} />
        <S.MemberCountInfo>
          <S.AvailableMemberCount>
            {availableTotalMemberCnt}
          </S.AvailableMemberCount>
          <S.TotalMemberCount> / {memberCount}명</S.TotalMemberCount>
        </S.MemberCountInfo>
      </S.ParticipationInfo>

      <ScheduleTable
        meetingInfo={meetingInfo}
        allTimeRange={allTimeRange}
        timeTableValues={timeTableValues}
        mappedMembersByTimeSlots={
          hasParticipants(meetingInfo) ? meetingInfo.schedule : undefined
        }
        availableTotalMemberCnt={availableTotalMemberCnt}
      />

      <S.ButtonLink
        href={ROUTE_PATH.SCHEDULE_LOGIN(meetingId)}
        buttonstyle="secondary"
        size="full-width"
      >
        내 스케줄 등록 / 수정하기
      </S.ButtonLink>
    </S.ParticipationInfoWrapper>
  );
}
