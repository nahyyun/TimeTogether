import * as S from "./style";

interface ToggleButtonProps {
  isChecked: boolean;
  toggle: (status: boolean) => void;
}

export default function ToggleButton({ isChecked, toggle }: ToggleButtonProps) {
  return (
    <S.ToggleButtonContainer>
      <S.ToggleBackground isChecked={isChecked}>
        <S.ToggleStatusSpan isChecked={isChecked}>가능한</S.ToggleStatusSpan>
        <S.ToggleStatusSpan isChecked={!isChecked}>불가능한</S.ToggleStatusSpan>
      </S.ToggleBackground>
      <S.ToggleButton isChecked={isChecked}></S.ToggleButton>
      <S.CheckBox
        type="checkbox"
        checked={isChecked}
        onChange={(e) => {
          toggle(e.target.checked);
        }}
      />
    </S.ToggleButtonContainer>
  );
}
