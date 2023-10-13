import { forwardRef } from "react";
import { MeetingInputRefs } from "@/types/meeting";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: keyof MeetingInputRefs;
  label: string;
  type: string;
}

const Input = forwardRef<MeetingInputRefs, InputProps>(function Input(
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
