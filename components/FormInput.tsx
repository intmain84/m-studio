// This component is only for text, number, email, password inputs
"use client";
import { UseFormRegisterReturn } from "react-hook-form";

type FormInputProps = {
  label?: string;
  type: React.HTMLInputTypeAttribute;
  placeholder?: string;
  error?: string;
  registration: UseFormRegisterReturn;
  className?: string;
};

const FormInput = ({
  label,
  type,
  placeholder,
  error,
  registration,
  className,
}: FormInputProps) => {
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
