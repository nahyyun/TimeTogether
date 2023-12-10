export const ERROR_MESSAGE = {
  INVALID_INPUT: "입력칸을 올바르게 채워주세요.",
  INVALID_TIME_RANGE: "시간대를 올바르게 설정해주세요.",
  DUPLICATE_NAME: "중복되는 이름이 존재합니다.",
  EXCEEDED_MEMBER_CNT: "모임의 정원을 초과하였습니다.",
  INVALID_SCHEDULE_TIME: "시간을 선택해주세요.",
} as const;

export const SUCCESS_MESSAGE = {
  CREATE_MEETING: "일정 생성이 완료되었습니다.",
  CREATE_SCHEDULE: "스케줄 생성이 완료되었습니다.",
  UPDATE_SCHEDULE: "스케줄 수정이 완료되었습니다.",
} as const;