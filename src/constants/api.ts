export const END_POINT = {
  GUEST_MEETING: "/api/guest/meeting",
  GUEST_SCHEDULE: (id: string) => `/api/guest/meeting/${id}`,
  GUEST_SCHEDULE_RESULT: (id: string) => `/api/guest/meeting/${id}/result`,
} as const;
