const isTitleNull = (title: string) => title.trim().length > 0;

const isMemeberCntValid = (cnt: number) => cnt > 0 && cnt < 20;

export const isValidTimeRange = (startIdx: number, endIdx: number) =>
  startIdx < endIdx;

export const isFirstStepInputsValid = (title: string, cnt: number) =>
  isTitleNull(title) && isMemeberCntValid(cnt);

export const isDuplicatedName = (lists: string[], name: string) =>
  lists.includes(name);

export const isExceededMemberCnt = (
  maxMemberCnt: number,
  currentParticipantCnt: number
) => currentParticipantCnt >= maxMemberCnt;