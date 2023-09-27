import { forwardRef } from "react";
import { MeetingFormRefType } from "@/types/Meeting";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: keyof MeetingFormRefType;
  label: string;
  type: string;
}

const Input = forwardRef<MeetingFormRefType, InputProps>(function Input(
  { label, type, id, ...props }: InputProps,
  ref
) {
  if (!ref || typeof ref == "function") return null;

  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        id={id}
        name={id}
        {...props}
        ref={(el) => ref.current && (ref.current[id] = el)}
      />
    </>
  );
});

export default Input;
