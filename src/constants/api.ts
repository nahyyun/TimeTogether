export const END_POINT = {
  GUEST_MEETING: "/api/guest/meeting",
  GUEST_SCHEDULE: (id: string, name?: string) =>
    name ? `/api/guest/meeting/${id}?name=${name}` : `/api/guest/meeting/${id}`,
  GUEST_SCHEDULE_RESULT: (id: string | undefined) =>
    `/api/guest/meeting/${id}/result`,
} as const;



  export const API_ERROR_MESSAGE = {
    "400": "잘못된 요청입니다.",
    "404": "요청한 데이터 찾을 수 없습니다.",
    "500": "서버 오류가 발생했습니다.",
    DEFAULT: "오류가 발생했습니다. 잠시 후에 다시 시도해주세요.",
  } as const;

