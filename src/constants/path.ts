export const ROUTE_PATH = {
  MAIN: "/",
  LOGIN: "/login",
  MAKE_MEETING: "/make-meeting",
  MAKE_MEETING_RESULT: (id: string) => `/make-meeting/result/${id}`,
  SCHEDULE_LOGIN: (id: string) => `/schedule/login/${id}`,
  SCHEDULE_TIME: (id: string) => `/schedule/time/${id}`,
  INVITE: "/invite",
  NOT_FOUND: "*",
};
