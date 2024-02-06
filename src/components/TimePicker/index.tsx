import { memo } from "react";
import { TimeRange } from "@/constants/timeArray";
import TimeListContainer from "./TimeListContainer";
import {
  START_TIME_START_SCROLL_Y,
  END_TIME_START_SCROLL_Y,
} from "@/constants/scroll";
import * as S from "./style";
import { setTimeValueFnArg } from "@/types/meeting";

interface TimePickerProps {
  setTimeValue: ({ key, info }: setTimeValueFnArg) => void;
}

const TimePicker = memo(function TimePicker({ setTimeValue }: TimePickerProps) {
  return (
    <S.TimePickerContainer>
      <S.HighlightBorder />
      <TimeListContainer
        range={TimeRange}
        startScrollY={START_TIME_START_SCROLL_Y}
        setSelectedTimeIdx={(idx: number, value: string) =>
          setTimeValue({ key: "startTime", info: { idx, value } })
        }
      />

      <S.Separator>~</S.Separator>

      <TimeListContainer
        range={TimeRange}
        startScrollY={END_TIME_START_SCROLL_Y}
        setSelectedTimeIdx={(idx: number, value: string) =>
          setTimeValue({ key: "endTime", info: { idx, value } })
        }
      />
    </S.TimePickerContainer>
  );
});

export default TimePicker;
