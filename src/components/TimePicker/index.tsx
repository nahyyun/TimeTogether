import { useEffect, useState } from "react";
import { TimeRange } from "utils/timePicker";
import * as S from "./style";
import TimeListContainer from "./TimeListContainer";

interface TimePickerProps {
  setTimeValue: (time: [string, string]) => void;
}

export default function TimePicker({ setTimeValue }: TimePickerProps) {
  const [selectedTimeIdx, setSelectedTimeIdx] = useState({
    startTimeIdx: 0,
    endTimeIdx: 0,
  });

  const updateSelectedTimeIdx = (key: string, idx: number) => {
    const newSelectedTimeIdx = { ...selectedTimeIdx, [key]: idx };
    const { startTimeIdx, endTimeIdx } = newSelectedTimeIdx;

    if (startTimeIdx > endTimeIdx) return;

    setSelectedTimeIdx((prev) => ({ ...prev, [key]: idx }));
  };

  useEffect(() => {
    const { startTimeIdx, endTimeIdx } = selectedTimeIdx;

    setTimeValue([TimeRange[startTimeIdx], TimeRange[endTimeIdx]]);
  }, [selectedTimeIdx]);

  return (
    <S.TimePickerContainer>
      <TimeListContainer
        range={TimeRange}
        setSelectedTimeIdx={(idx: number) =>
          updateSelectedTimeIdx("startTimeIdx", idx)
        }
      />

      <S.Separator>~</S.Separator>

      <TimeListContainer
        range={TimeRange}
        setSelectedTimeIdx={(idx: number) =>
          updateSelectedTimeIdx("endTimeIdx", idx)
        }
      />
    </S.TimePickerContainer>
  );
}
