export const selectedTimeInfoDefaultValue = {
  startTime: { value: "", idx: 0 },
  endTime: { value: "", idx: 0 },
};

export const meetingFormDefaultValue = {
  title: "",
  memberCnt: "",
  date: new Date(),
  time: selectedTimeInfoDefaultValue,
};

export const meetingInputRefsDefaultValue = {
  title: null,
  memberCnt: null,
};
