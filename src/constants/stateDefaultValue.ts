export const selectedTimeInfoDefaultValue = {
  startTime: { value: "12:00", idx: 24 },
  endTime: { value: "16:00", idx: 32 },
};

export const meetingFormDefaultValue = {
  title: "",
  memberCount: 0,
  members: [],
  date: new Date(),
  isMemberCountDecided: true,
  timeRange: selectedTimeInfoDefaultValue,
};

export const meetingInputRefsDefaultValue = {
  title: null,
  memberCount: null,
};
