export const TimeRange = Array.from({ length: 48 }, (_, hour: number) => {
  const hourFormat = String(Math.floor(hour * 0.5)).padStart(2, "0");
  const minuteFormat = String((hour * 30) % 60).padStart(2, "0");

  return `${hourFormat}:${minuteFormat}`;
});
