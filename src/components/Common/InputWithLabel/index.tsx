import { forwardRef } from "react";
import { MeetingInputRefs } from "@/types/meeting";
import * as S from "./style";

interface InputWithLabelProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  id: keyof MeetingInputRefs;
  label: string;
  type: string;
}

const InputWithLabel = forwardRef<MeetingInputRefs, InputWithLabelProps>(
  function Input({ label, type, id, ...props }: InputWithLabelProps, ref) {
    if (!ref || typeof ref == "function") return null;

    return (
      <S.InputWithLabelWrapper>
        <S.Label htmlFor={id}>{label}</S.Label>
        <div>
          <S.Input
            type={type}
            id={id}
            name={id}
            {...props}
            ref={(el) => ref.current && (ref.current[id] = el)}
          />
        </div>
      </S.InputWithLabelWrapper>
    );
  }
);

export default InputWithLabel;
