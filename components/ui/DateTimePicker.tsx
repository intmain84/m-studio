"use client";
import { useEffect, useState } from "react";

type DateTimePickerProps = {
  selectedDate: string;
  selectedTime: string;
  onDateChange: (date: string) => void;
  onTimeChange: (time: string) => void;
  reservedSlots?: string[]; // "YYYY-MM-DD HH" e.g. "2024-02-09 14"
};

const DATES_VISIBLE = 7;
const TIMES_VISIBLE = 5;
const TOTAL_DATES = 60;

const HOUR_SLOTS = [
  { label: "10:00 AM", hour: 10 },
  { label: "11:00 AM", hour: 11 },
  { label: "12:00 PM", hour: 12 },
  { label: "1:00 PM", hour: 13 },
  { label: "2:00 PM", hour: 14 },
  { label: "3:00 PM", hour: 15 },
  { label: "4:00 PM", hour: 16 },
  { label: "5:00 PM", hour: 17 },
  { label: "6:00 PM", hour: 18 },
  { label: "7:00 PM", hour: 19 },
  { label: "8:00 PM", hour: 20 },
  { label: "9:00 PM", hour: 21 },
  { label: "10:00 PM", hour: 22 },
];

const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTH_NAMES = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function toDateStr(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export default function DateTimePicker({
  selectedDate,
  selectedTime,
  onDateChange,
  onTimeChange,
  reservedSlots = [],
}: DateTimePickerProps) {
  const [today] = useState<Date>(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  });
  const [currentHour] = useState<number>(() => new Date().getHours());

  // dates[0] = today - 3, today is at index 3 (center of initial 7-item window)
  const [dates] = useState<Date[]>(() =>
    Array.from({ length: TOTAL_DATES }, (_, i) => {
      const d = new Date(today);
      d.setDate(today.getDate() - 3 + i);
      return d;
    }),
  );

  const [dateWindowStart, setDateWindowStart] = useState(0);
  const [timeWindowStart, setTimeWindowStart] = useState(() => {
    const nowHour = new Date().getHours();
    const firstFutureIdx = HOUR_SLOTS.findIndex((s) => s.hour > nowHour);
    const idx = firstFutureIdx === -1 ? HOUR_SLOTS.length - 1 : firstFutureIdx;
    const center = Math.floor(TIMES_VISIBLE / 2);
    return Math.max(0, Math.min(idx - center, HOUR_SLOTS.length - TIMES_VISIBLE));
  });

  const visibleDates = dates.slice(
    dateWindowStart,
    dateWindowStart + DATES_VISIBLE,
  );
  const visibleTimes = HOUR_SLOTS.slice(
    timeWindowStart,
    timeWindowStart + TIMES_VISIBLE,
  );

  const todayStr = toDateStr(today);
  const minTimeWindowStart = (() => {
    const firstFutureIdx = HOUR_SLOTS.findIndex((s) => s.hour > currentHour);
    const idx = firstFutureIdx === -1 ? HOUR_SLOTS.length - 1 : firstFutureIdx;
    return Math.max(0, Math.min(idx - Math.floor(TIMES_VISIBLE / 2), HOUR_SLOTS.length - TIMES_VISIBLE));
  })();

  useEffect(() => {
    if (selectedDate > todayStr) {
      setTimeWindowStart(0);
    } else {
      setTimeWindowStart(minTimeWindowStart);
    }
  }, [selectedDate]); // eslint-disable-line react-hooks/exhaustive-deps

  const canPrevDate = dateWindowStart > 0;
  const canNextDate = dateWindowStart + DATES_VISIBLE < dates.length;
  const isFutureDate = selectedDate > todayStr;
  const canPrevTime = timeWindowStart > (isFutureDate ? 0 : minTimeWindowStart);
  const canNextTime = timeWindowStart + TIMES_VISIBLE < HOUR_SLOTS.length;

  function isDatePast(d: Date) {
    return d < today;
  }

  function isTimePast(dateStr: string, hour: number) {
    if (dateStr > todayStr) return false; // выбрана будущая дата — все часы доступны
    return hour <= currentHour;
  }

  function isTimeReserved(dateStr: string, hour: number) {
    return reservedSlots.includes(`${dateStr} ${hour}`);
  }

  return (
    <div className="flex flex-col gap-6 md:gap-8">
      {/* === Date Slider === */}
      <div className="flex items-center gap-2 md:gap-3">
        <NavButton
          onClick={() => setDateWindowStart((s) => s - 1)}
          disabled={!canPrevDate}
        />

        <div className="flex-1 flex flex-col min-w-0">
          {/* Day names */}
          <div className="flex">
            {visibleDates.map((d, i) => {
              const past = isDatePast(d);
              return (
                <div
                  key={i}
                  className="flex-1 flex items-center justify-center py-4"
                >
                  <span
                    className={`text-[0.75rem] md:text-[1rem] leading-[1.1] whitespace-nowrap select-none ${
                      past ? "text-white/20" : "text-white"
                    }`}
                  >
                    {DAY_NAMES[d.getDay()]}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Date cells */}
          <div className="flex h-20">
            {visibleDates.map((d, i) => {
              const dateStr = toDateStr(d);
              const past = isDatePast(d);
              const selected = dateStr === selectedDate;
              return (
                <div
                  key={i}
                  onClick={() => !past && onDateChange(dateStr)}
                  className={`flex-1 flex flex-col items-center justify-center gap-2 transition-colors ${
                    past
                      ? "text-white/20 cursor-default"
                      : "text-white cursor-pointer"
                  } ${
                    selected ? "bg-white/20" : !past ? "hover:bg-white/10" : ""
                  }`}
                >
                  <span className="text-[1.25rem] md:text-[1.5rem] leading-[1.1] uppercase select-none">
                    {d.getDate()}
                  </span>
                  <span className="text-[0.75rem] md:text-[0.875rem] leading-[1.1] select-none">
                    {MONTH_NAMES[d.getMonth()]}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <NavButton
          onClick={() => setDateWindowStart((s) => s + 1)}
          disabled={!canNextDate}
          rotate
        />
      </div>

      {/* === Time Slider === */}
      <div className="flex items-center gap-2 md:gap-3">
        <NavButton
          onClick={() => setTimeWindowStart((s) => s - 1)}
          disabled={!canPrevTime}
        />

        <div className="flex-1 flex gap-2 h-9 items-stretch min-w-0">
          {visibleTimes.map((slot) => {
            const past = isTimePast(selectedDate, slot.hour);
            const reserved = isTimeReserved(selectedDate, slot.hour);
            const disabled = past || reserved;
            const selected = selectedTime === slot.label;
            return (
              <div key={slot.hour} className="relative flex-1 group">
                <div
                  onClick={() => !disabled && onTimeChange(slot.label)}
                  className={`w-full h-full flex items-center justify-center transition-colors ${
                    selected
                      ? "bg-white/20"
                      : disabled
                        ? ""
                        : "hover:bg-white/10"
                  } ${
                    disabled
                      ? "text-white/20 cursor-default"
                      : "text-white cursor-pointer"
                  }`}
                >
                  <span className="text-[0.75rem] md:text-[0.875rem] leading-[1.1] whitespace-nowrap select-none">
                    {slot.label}
                  </span>
                </div>
                {reserved && (
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-white text-[#0f0f11] text-[0.75rem] leading-[1.1] whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity z-10">
                    Not available
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <NavButton
          onClick={() => setTimeWindowStart((s) => s + 1)}
          disabled={!canNextTime}
          rotate
        />
      </div>
    </div>
  );
}

function NavButton({
  onClick,
  disabled,
  rotate = false,
}: {
  onClick: () => void;
  disabled: boolean;
  rotate?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`shrink-0 size-10 md:size-14 rounded-full border flex items-center justify-center transition-colors ${
        disabled
          ? "border-white/10 opacity-20 cursor-default"
          : "border-white/20 cursor-pointer hover:border-white/50"
      } ${rotate ? "rotate-180" : ""}`}
    >
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path
          d="M12.5 15L7.5 10L12.5 5"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
