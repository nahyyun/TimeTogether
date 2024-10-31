const BASE_GUEST_API = "/api/guest/meeting";

export const END_POINT = {
  GUEST_MEETING: {
    BASE: BASE_GUEST_API,
    BY_ID: (id?: string) => `${BASE_GUEST_API}/${id}`,
  },
  GUEST_SCHEDULE: (id: string, name?: string) =>
    name
      ? `${BASE_GUEST_API}/${id}/schedule?name=${name}`
      : `${BASE_GUEST_API}/${id}/schedule`,
  GUEST_SCHEDULE_RESULT: (id: string | undefined) =>
    `${BASE_GUEST_API}/${id}/schedule/result`,
} as const;

export const API_ERROR_MESSAGE = {
  "400": "잘못된 요청입니다.",
  "404": "요청한 데이터 찾을 수 없습니다.",
  "500": "서버 오류가 발생했습니다.",
  DEFAULT: "오류가 발생했습니다. 잠시 후에 다시 시도해주세요.",
} as const;
