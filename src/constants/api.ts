export const END_POINT = {
  GUEST_MEETING: "/api/guest/meeting",
  GUEST_SCHEDULE: (id: string) => `/api/guest/${id}/schedule`,
} as const;
