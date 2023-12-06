import { useEffect, useState } from "react";
import { TimeRange } from "@/constants/timeArray";
import TimeListContainer from "./TimeListContainer";
import { selectedTimeInfoDefaultValue } from "@/constants/stateDefaultValue";
import { selectedTimeInfo } from "@/types/timeInfo";
import {
  START_TIME_START_SCROLL_Y,
  END_TIME_START_SCROLL_Y,
} from "@/constants/scroll";
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
      <S.HighlightBorder />
      <TimeListContainer
        range={TimeRange}
        startScrollY={START_TIME_START_SCROLL_Y}
        setSelectedTimeIdx={(idx: number, value: string) =>
          updateSelectedTimeIdx("startTime", idx, value)
        }
      />

      <S.Separator>~</S.Separator>

      <TimeListContainer
        range={TimeRange}
        startScrollY={END_TIME_START_SCROLL_Y}
        setSelectedTimeIdx={(idx: number, value: string) =>
          updateSelectedTimeIdx("endTime", idx, value)
        }
      />
    </S.TimePickerContainer>
  );
}
