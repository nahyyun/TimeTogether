const extractHourAndMinute = (time: string) => {
  const [hour, minute] = time.split(":").map(Number);

  return [hour, minute];
};

export const getAllTimeHourRange = (startTime: string, endTime: string) => {
  const [startHour] = extractHourAndMinute(startTime);
  const [endHour, endMinute] = extractHourAndMinute(endTime);

  return Array.from(
    { length: endHour - startHour + (endMinute === 30 ? 1 : 0) },
    (_, i) => startHour + i
  );
};

export const getTimeTableValues = (
  endTime: string,
  allTimeHourRange: number[]
) => {
  const [_, endMinute] = extractHourAndMinute(endTime);

  const timeTableValues = allTimeHourRange
    .map((time) => [
      `${String(time).padStart(2, "0")}:00`,
      `${String(time).padStart(2, "0")}:30`,
    ])
    .flat();

  if (endMinute === 30) timeTableValues.pop();

  return timeTableValues;
};

export const cannotSelect = (idx: number, currValue: string, startTime: string) =>
  idx == 0 && startTime !== currValue;

export const extractTimeDataset = (elements: HTMLElement[]) =>
  elements.map((el) => el.dataset.time || "");

const getTotalMinutes = (hour: number, minute: number) =>
  hour * 60 + minute + 30;

export const isSequentialTimes = (start: string, end: string) => {
  const [startHour, startMinute] = extractHourAndMinute(start);
  const [endHour, endMinute] = extractHourAndMinute(end);

  const startTotalTime = getTotalMinutes(startHour, startMinute);
  const endTotalTime = getTotalMinutes(endHour, endMinute);

  return endTotalTime - startTotalTime === 30;
};

export const add30Minutes = (time: string) => {
  const [hour, minute] = extractHourAndMinute(time);

  const totalMinutes = getTotalMinutes(hour, minute);

  const stringHour = String(Math.floor(totalMinutes / 60)).padStart(2, "0");
  const stringMinute = String(totalMinutes % 60).padStart(2, "0");

  return `${stringHour}:${stringMinute}`;
};
