import { useEffect, useState } from "react";
import { TimeRange } from "@/constants/timeArray";
import TimeListContainer from "./TimeListContainer";
import { selectedTimeInfoDefaultValue } from "@/constants/stateDefaultValue";
import { selectedTimeInfo } from "@/types/timeInfo";
import * as S from "./style";

interface TimePickerProps {
  setTimeValue: (time: selectedTimeInfo) => void;
}

export default function TimePicker({ setTimeValue }: TimePickerProps) {
  const [selectedTimeInfo, setSelectedTimeInfo] = useState(
    selectedTimeInfoDefaultValue
  );

  const updateSelectedTimeIdx = (key: string, idx: number, value: string) => {
    setSelectedTimeInfo((prev) => ({ ...prev, [key]: { idx, value } }));
  };

  useEffect(() => {
    setTimeValue(selectedTimeInfo);
  }, [selectedTimeInfo]);

  return (
    <S.TimePickerContainer>
      <S.HighlightBorder></S.HighlightBorder>
      <TimeListContainer
        range={TimeRange}
        setSelectedTimeIdx={(idx: number, value: string) =>
          updateSelectedTimeIdx("startTime", idx, value)
        }
      />

      <S.Separator>~</S.Separator>

      <TimeListContainer
        range={TimeRange}
        setSelectedTimeIdx={(idx: number, value: string) =>
          updateSelectedTimeIdx("endTime", idx, value)
        }
      />
    </S.TimePickerContainer>
  );
}
