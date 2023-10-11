import { useState } from "react";
import { TimeRange } from "utils/timePicker";
import * as S from "./style";
import TimeListContainer from "./TimeListContainer";

export default function TimePicker() {
  const [selectedTimeIdx, setSelectedTimeIdx] = useState({
    startTimeIdx: 0,
    endTimeIdx: 0,
  });

  const startTime = (key: string, idx: number) => {
    setSelectedTimeIdx((prev) => ({ ...prev, [key]: idx }));
  };

  return (
    <S.TimePickerContainer>
      <TimeListContainer
        range={TimeRange}
        setSelectedTimeIdx={(idx: number) => startTime("startTimeIdx", idx)}
      />

      <S.Separator>~</S.Separator>

      <TimeListContainer
        range={TimeRange}
        setSelectedTimeIdx={(idx: number) => startTime("endTimeIdx", idx)}
      />
    </S.TimePickerContainer>
  );
}
