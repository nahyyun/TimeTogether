export const formatDateToString = (dateData: Date) => dateData.toISOString();

export const extractDatePartsFromStringType = (stringDate: string) => {
  const dateData = new Date(stringDate);

  const year = dateData.getFullYear();
  const month = dateData.getMonth() + 1;
  const date = dateData.getDate();
  const day = dateData.getDay();

  return { year, month, date, day };
};