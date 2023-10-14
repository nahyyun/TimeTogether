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
  }

  .react-datepicker__day-names {
    font-weight: 600;
  }

  .react-datepicker__day--selected {
    background: ${theme.colors.primary[100]};
    border-radius: 13px;
  }
`;
