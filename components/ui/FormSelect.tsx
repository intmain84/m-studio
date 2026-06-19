"use client";
import { useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

type Option = { value: string; label: string };

type FormSelectProps = {
  label?: string;
  placeholder?: string;
  options: Option[];
  registration: UseFormRegisterReturn;
  error?: string;
  className?: string;
};

export default function FormSelect({
  label,
  placeholder,
  options,
  registration,
  error,
  className = "",
}: FormSelectProps) {
  const [hasValue, setHasValue] = useState(false);

  return (
    <div className={`relative flex flex-col ${className}`}>
      <div className="h-12 pb-3 gap-2 flex flex-col justify-center border-b border-foreground-muted focus-within:border-white transition-colors">
        {label && (
          <label htmlFor={registration.name} className={`text-[0.75rem] leading-[1.1] shrink-0 transition-colors ${hasValue ? "text-foreground-muted" : "text-foreground"}`}>
            {label}
          </label>
        )}
        <div className="relative">
          <select
            id={registration.name}
            {...registration}
            onChange={(e) => {
              setHasValue(e.target.value !== "");
              registration.onChange(e);
            }}
            className="appearance-none bg-transparent w-full text-[0.875rem] leading-[1.1] text-foreground focus:outline-none cursor-pointer pr-6"
          >
            {placeholder && (
              <option value="" className="bg-background text-foreground-muted">
                {placeholder}
              </option>
            )}
            {options.map((opt) => (
              <option
                key={opt.value}
                value={opt.value}
                className="bg-background"
              >
                {opt.label}
              </option>
            ))}
          </select>
          <svg
            className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-foreground-muted"
            width="11"
            height="11"
            viewBox="0 0 12 12"
            fill="none"
          >
            <path
              d="M2 4L6 8L10 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
      {error && (
        <span className="absolute top-[101%] text-danger/70 left-0  text-[0.7rem] leading-[1.1] pt-0.5">
          {error}
        </span>
      )}
    </div>
  );
}
