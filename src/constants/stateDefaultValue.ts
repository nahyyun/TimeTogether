export const selectedTimeInfoDefaultValue = {
  startTime: { value: "", idx: 0 },
  endTime: { value: "", idx: 0 },
};

export const meetingFormDefaultValue = {
  title: "",
  memberCount: 0,
  date: new Date(),
  timeRange: selectedTimeInfoDefaultValue,
};

export const meetingInputRefsDefaultValue = {
  title: null,
  memberCount: null,
};
