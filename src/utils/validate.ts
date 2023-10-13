const isTitleNull = (title: string) => title.trim().length > 0;

const isMemeberCntValid = (cnt: number) => cnt > 0 && cnt < 20;

export const isTimeValid = (startIdx: number, endIdx: number) =>
  startIdx < endIdx;

export const isFirstStepInputsValid = (title: string, cnt: number) => {
  return isTitleNull(title) && isMemeberCntValid(cnt);
};
