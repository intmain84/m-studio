// For text, number, email, password, tel inputs
"use client";
import { UseFormRegisterReturn } from "react-hook-form";

type FormInputProps = {
  label?: string;
  type: React.HTMLInputTypeAttribute;
  placeholder?: string;
  error?: string;
  registration: UseFormRegisterReturn;
  className?: string;
  variant?: "default" | "underline";
};

const FormInput = ({
  label,
  type,
  placeholder,
  error,
  registration,
  className,
  variant = "default",
}: FormInputProps) => {
  if (variant === "underline") {
    return (
      <div className={`relative flex flex-col ${className ?? ""}`}>
        <div className="h-[3rem] pb-3 gap-2 flex flex-col justify-center border-b border-foreground-muted focus-within:border-white transition-colors">
          {label && (
            <span className="text-[0.75rem] text-foreground-muted leading-[1.1] shrink-0">
              {label}
            </span>
          )}
          <input
            type={type}
            placeholder={placeholder}
            className="bg-transparent text-[0.875rem] text-foreground placeholder:text-foreground-muted leading-[1.1] focus:outline-none w-full"
            {...registration}
          />
        </div>
        {error && (
          <span className="absolute top-full left-0 text-danger text-[0.75rem] leading-[1.1] pt-0.5">
            {error}
          </span>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1">
      {label && <label className="block mb-1 font-medium">{label}</label>}
      <input
        type={type}
        placeholder={placeholder}
        className={className}
        {...registration}
      />
      {error && <span className="text-red-500">{error}</span>}
    </div>
  );
};

export default FormInput;
