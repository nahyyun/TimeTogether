export const selectedTimeInfoDefaultValue = {
  startTime: { value: "", idx: 0 },
  endTime: { value: "", idx: 0 },
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
