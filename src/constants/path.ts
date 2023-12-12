export const ROUTE_PATH = {
  MAIN: "/",
  LOGIN: "/login",
  MAKE_MEETING: "/make-meeting",
  RESULT_OF_MAKE_MEETING: (id: string) => `/make-meeting/result/${id}`,
  SCHEDULE_LOGIN: (id: string) => `/schedule/login/${id}`,
  RESULT: (id: string) => `/result/${id}`,
  INVITE: "/invite",
  NOT_FOUND: "/404",
};
