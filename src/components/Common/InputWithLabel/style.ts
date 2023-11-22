import { theme } from "@/styles/theme";
import styled from "@emotion/styled";

export const InputWithLabelWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const Label = styled.label`
  font-size: ${theme.text.size.sm};
`;

export const Input = styled.input`
  padding: 10px;
  width: 100%;
  border: 1px solid ${theme.colors.primary[100]};
  border-radius: 7px;
  outline: none;

  &:focus {
    border: 1.5px solid ${theme.colors.primary[300]};
  }

  &::placeholder {
    color: ${theme.colors.text.muted};
  }
`;
