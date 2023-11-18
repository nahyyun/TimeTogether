export const getTimestampFromTime = (time: string) =>
  new Date(`2000-01-01 ${time}`).getTime();

export const getTimeInterval = (
  startStringTime: string,
  endStringTime: string
) => {
  const startTime = getTimestampFromTime(startStringTime);
  const endTime = getTimestampFromTime(endStringTime);

  return endTime - startTime;
};
