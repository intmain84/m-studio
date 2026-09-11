"use client";
import { useState } from "react";

type BirthdayInputProps = {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  className?: string;
  name?: string;
};

// Digits are accepted one at a time, left to right: DD MM YYYY.
// Each position only accepts digits that keep the date within range —
// day 01-31, month 01-12, year starting with 19 or 20.
function isDigitAllowed(index: number, digit: string, digits: string): boolean {
  switch (index) {
    case 0: // day, tens
      return "0123".includes(digit);
    case 1: { // day, ones
      const tens = digits[0];
      if (tens === "0") return digit !== "0"; // no "00"
      if (tens === "3") return digit === "0" || digit === "1"; // 30 or 31
      return true;
    }
    case 2: // month, tens
      return digit === "0" || digit === "1";
    case 3: { // month, ones
      const tens = digits[2];
      if (tens === "1") return "012".includes(digit); // 10, 11, 12
      return digit !== "0"; // no "00"
    }
    case 4: // year, 1st digit
      return digit === "1" || digit === "2";
    case 5: { // year, 2nd digit — "19" or "20" only
      const first = digits[4];
      if (first === "1") return digit === "9";
      if (first === "2") return digit === "0";
      return false;
    }
    case 6: // year, 3rd/4th digit — any digit
    case 7:
      return true;
    default:
      return false;
  }
}

function format(digits: string) {
  return [digits.slice(0, 2), digits.slice(2, 4), digits.slice(4, 8)]
    .filter(Boolean)
    .join("/");
}

export default function BirthdayInput({
  label,
  value,
  onChange,
  onBlur,
  error,
  className,
  name,
}: BirthdayInputProps) {
  const digits = value.replace(/\D/g, "");
  const [hasValue, setHasValue] = useState(digits.length > 0);

  const applyDigits = (next: string) => {
    setHasValue(next.length > 0);
    onChange(format(next));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.metaKey || e.ctrlKey) return;
    if (e.key === "Backspace" || e.key === "Delete") {
      e.preventDefault();
      applyDigits(digits.slice(0, -1));
      return;
    }
    if (
      e.key === "Tab" ||
      e.key.startsWith("Arrow") ||
      e.key === "Shift" ||
      e.key === "Escape" ||
      e.key === "Enter"
    ) {
      return;
    }
    e.preventDefault();
    if (!/^\d$/.test(e.key)) return;
    if (digits.length >= 8) return;
    if (!isDigitAllowed(digits.length, e.key, digits)) return;
    applyDigits(digits + e.key);
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "");
    let next = digits;
    for (const ch of pasted) {
      if (next.length >= 8) break;
      if (isDigitAllowed(next.length, ch, next)) next += ch;
    }
    applyDigits(next);
  };

  return (
    <div className={`relative flex flex-col ${className ?? ""}`}>
      <div className="h-12 pb-3 gap-2 flex flex-col justify-center border-b border-foreground-muted focus-within:border-white transition-colors">
        {label && (
          <label
            htmlFor={name}
            className={`text-[0.75rem] leading-[1.1] shrink-0 transition-colors ${hasValue ? "text-foreground-muted" : "text-foreground"}`}
          >
            {label}
          </label>
        )}
        <input
          id={name}
          type="text"
          inputMode="numeric"
          autoComplete="off"
          placeholder="DD/MM/YYYY"
          value={value}
          onChange={() => {}}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
          onBlur={onBlur}
          className="bg-transparent text-[0.875rem] text-foreground placeholder:text-foreground-muted leading-[1.1] focus:outline-none w-full"
        />
      </div>
      {error && (
        <span className="absolute left-0 top-[101%] text-danger/70 text-[0.7rem] leading-[1.1] pt-0.5">
          {error}
        </span>
      )}
    </div>
  );
}
