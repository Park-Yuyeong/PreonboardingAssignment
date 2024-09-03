import { ComponentProps, useId } from "react";

type InputProps = {
  label?: string;
} & ComponentProps<"input">;

const Input = ({ label, ...props }: InputProps) => {
  const inputId = useId();

  return (
    <div className="flex flex-col gap-y-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-semibold cursor-pointer px-1"
        >
          <span>{label}</span>
        </label>
      )}
      <input
        id={inputId}
        {...props}
        className="text-base bg-black border border-white rounded px-3 py-2 focus:outline-none focus:scale-105 transition"
      />
    </div>
  );
};

export default Input;
