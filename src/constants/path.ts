export const ROUTE_PATH = {
  MAIN: "/",
  LOGIN: "/login",
  MAKE_MEETING: "/make-meeting",
  MAKE_MEETING_RESULT: (id: number) => `make-meeting/result/${id}`,
  INVITE: "/invite",
  NOT_FOUND: "*",
};
