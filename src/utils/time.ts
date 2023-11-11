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

export const getTimeTableValues = (allTimeRange: number[]) =>
  allTimeRange
    .map((time) => [
      `${String(time).padStart(2, "0")}:00`,
      `${String(time).padStart(2, "0")}:30`,
    ])
    .flat();


export const canSelect = (
  idx: number,
  target: string,
  endIdx: number,
  startTime: string,
  endTime: string
) =>
  (idx == 0 && startTime !== target) || (idx == endIdx && endTime !== target);

export const extractTimeDataset = (elements: HTMLElement[]) =>
  elements.map((el) => el.dataset.time || "");
