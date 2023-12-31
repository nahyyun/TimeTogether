import { theme } from "@/styles/theme";
import styled from "@emotion/styled";

export const DatePickerWrapper = styled.div`
  text-align: center;

  .react-datepicker {
    border: none;
  }

  .react-datepicker__header {
    background-color: transparent;
    border: none;
    padding: 0;
  }

  .react-datepicker__month {
    margin: 0;
  }

  .react-datepicker__day-names {
    font-weight: 600;
  }

  .react-datepicker__day--selected,
  .react-datepicker__day--selected:hover {
    background: ${theme.colors.primary[50]};
    border-radius: 50%;
  }

  .react-datepicker__day-name,
  .react-datepicker__day,
  .react-datepicker__time-name {
    width: 2.2rem;
    line-height: 2.2rem;
  }
`;
