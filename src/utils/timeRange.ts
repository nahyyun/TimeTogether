const getHourFromTime = (time: string) => {
  const [hour] = time.split(":");

  return Number(hour);
};

export const getAllTimeRange = (startTime: string, endTime: string) => {
  const startHour = getHourFromTime(startTime);
  const endHour = getHourFromTime(endTime);

  return Array.from(
    { length: endHour - startHour + 1 },
    (_, i) => startHour + i
  );
};

export const getTimeStringArray = (allTimeRange: number[]) =>
  allTimeRange
    .map((time) => [time < 10 ? `0${time}:00` : `${time}:00`, `${time}:30`])
    .flat();

export const canSelect = (
  idx: number,
  target: string,
  endIdx: number,
  startTime: string,
  endTime: string
) =>
  (idx == 0 && startTime !== target) || (idx == endIdx && endTime !== target);
