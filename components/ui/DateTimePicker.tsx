"use client";
import { useEffect, useRef, useState } from "react";
import {
  DATES_VISIBLE,
  TIMES_VISIBLE,
  TOTAL_DATES,
  PAST_DAYS,
  HOUR_SLOTS,
  DAY_NAMES,
  MONTH_NAMES,
} from "@/content/calendar";

type DateTimePickerProps = {
  selectedDate: string;
  selectedTime: string;
  onDateChange: (date: string) => void;
  onTimeChange: (time: string) => void;
  reservedSlots?: Record<string, number[]>; // { "2024-02-09": [10, 14] }
  loading?: boolean;
  className?: string;
};

function toDateStr(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export default function DateTimePicker({
  selectedDate,
  selectedTime,
  onDateChange,
  onTimeChange,
  reservedSlots = {},
  loading = false,
  className,
}: DateTimePickerProps) {
  const [todayStr] = useState<string>(() =>
    new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Dubai" }).format(new Date())
  );
  const [currentHour] = useState<number>(() =>
    parseInt(
      new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Dubai",
        hour: "numeric",
        hour12: false,
      }).format(new Date()),
      10,
    )
  );

  // dates[0] = today - PAST_DAYS, dates[PAST_DAYS] = today
  const [dates] = useState<Date[]>(() => {
    const todayDate = new Date(todayStr + "T00:00:00");
    return Array.from({ length: TOTAL_DATES }, (_, i) => {
      const d = new Date(todayDate);
      d.setDate(todayDate.getDate() - PAST_DAYS + i);
      return d;
    });
  });

  // Desktop windowed state
  const [dateWindowStart, setDateWindowStart] = useState(0);
  const [timeWindowStart, setTimeWindowStart] = useState(() => {
    const nowHour = new Date().getHours();
    const firstFutureIdx = HOUR_SLOTS.findIndex((s) => s.hour > nowHour);
    const idx = firstFutureIdx === -1 ? HOUR_SLOTS.length - 1 : firstFutureIdx;
    const center = Math.floor(TIMES_VISIBLE / 2);
    return Math.max(
      0,
      Math.min(idx - center, HOUR_SLOTS.length - TIMES_VISIBLE),
    );
  });

  // Mobile scroll refs
  const mobileDateRef = useRef<HTMLDivElement>(null);
  const mobileTimeRef = useRef<HTMLDivElement>(null);

  const isFutureDate = selectedDate > todayStr;

  const minTimeWindowStart = (() => {
    const firstFutureIdx = HOUR_SLOTS.findIndex((s) => s.hour > currentHour);
    const idx = firstFutureIdx === -1 ? HOUR_SLOTS.length - 1 : firstFutureIdx;
    return Math.max(
      0,
      Math.min(
        idx - Math.floor(TIMES_VISIBLE / 2),
        HOUR_SLOTS.length - TIMES_VISIBLE,
      ),
    );
  })();

  // Desktop: reset time window on date change
  useEffect(() => {
    if (isFutureDate) {
      setTimeWindowStart(0);
    } else {
      setTimeWindowStart(minTimeWindowStart);
    }
  }, [selectedDate]); // eslint-disable-line react-hooks/exhaustive-deps

  // Mobile: scroll time to first available slot on date change
  useEffect(() => {
    const el = mobileTimeRef.current;
    if (!el) return;
    const cellWidth = el.offsetWidth / 4.5;
    if (isFutureDate) {
      el.scrollLeft = 0;
    } else {
      const firstFutureIdx = HOUR_SLOTS.findIndex((s) => s.hour > currentHour);
      const idx = Math.max(0, firstFutureIdx - 1);
      el.scrollLeft = idx * cellWidth;
    }
  }, [selectedDate]); // eslint-disable-line react-hooks/exhaustive-deps

  // Mobile: initial scroll — show 2 past days before today
  useEffect(() => {
    const dateEl = mobileDateRef.current;
    if (dateEl) {
      const cellWidth = dateEl.offsetWidth / 6.5;
      dateEl.scrollLeft = (PAST_DAYS - 2) * cellWidth;
    }
    const timeEl = mobileTimeRef.current;
    if (timeEl) {
      const cellWidth = timeEl.offsetWidth / 4.5;
      const firstFutureIdx = HOUR_SLOTS.findIndex((s) => s.hour > currentHour);
      const idx = Math.max(0, firstFutureIdx - 1);
      timeEl.scrollLeft = idx * cellWidth;
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const visibleDates = dates.slice(
    dateWindowStart,
    dateWindowStart + DATES_VISIBLE,
  );
  const visibleTimes = HOUR_SLOTS.slice(
    timeWindowStart,
    timeWindowStart + TIMES_VISIBLE,
  );

  const canPrevDate = dateWindowStart > 0;
  const canNextDate = dateWindowStart + DATES_VISIBLE < dates.length;
  const canPrevTime = timeWindowStart > (isFutureDate ? 0 : minTimeWindowStart);
  const canNextTime = timeWindowStart + TIMES_VISIBLE < HOUR_SLOTS.length;

  function isDatePast(d: Date) {
    return toDateStr(d) < todayStr;
  }

  function isTimePast(dateStr: string, hour: number) {
    if (dateStr > todayStr) return false;
    return hour <= currentHour;
  }

  function isTimeReserved(dateStr: string, hour: number) {
    return reservedSlots[dateStr]?.includes(hour) ?? false;
  }

  const dateCell = (d: Date, key: string | number, mobile = false) => {
    const dateStr = toDateStr(d);
    const past = isDatePast(d);
    const selected = dateStr === selectedDate;
    return (
      <div
        key={key}
        onClick={() => !past && onDateChange(dateStr)}
        className={`flex flex-col items-center justify-center gap-2 transition-colors h-20 ${
          mobile ? "shrink-0 w-[calc(100vw/6.5)]" : "flex-1"
        } ${
          past ? "text-white/20 cursor-default" : "text-white cursor-pointer"
        } ${selected ? "bg-white/20" : !past ? "hover:bg-white/10" : ""}`}
      >
        <span className="text-[1.25rem] md:text-[1.5rem] leading-[1.1] uppercase select-none">
          {d.getDate()}
        </span>
        <span className="text-[0.75rem] md:text-[0.875rem] leading-[1.1] select-none">
          {MONTH_NAMES[d.getMonth()]}
        </span>
      </div>
    );
  };

  const dayNameCell = (d: Date, key: string | number, mobile = false) => {
    const past = isDatePast(d);
    return (
      <div
        key={key}
        className={`flex items-center justify-center py-4 ${
          mobile ? "shrink-0 w-[calc(100vw/6.5)]" : "flex-1"
        }`}
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
  };

  const timeCell = (
    slot: (typeof HOUR_SLOTS)[number],
    key: string | number,
    mobile = false,
  ) => {
    const past = isTimePast(selectedDate, slot.hour);
    const reserved = isTimeReserved(selectedDate, slot.hour);
    const disabled = past || reserved;
    const selected = selectedTime === slot.label;
    return (
      <div
        key={key}
        className={`relative group h-9 flex items-center justify-center transition-colors ${
          mobile ? "shrink-0 w-[calc(100vw/4.5)]" : "flex-1"
        } ${selected ? "bg-white/20" : disabled ? "" : "hover:bg-white/10"} ${
          disabled
            ? "text-white/20 cursor-default"
            : "text-white cursor-pointer"
        }`}
        onClick={() => !disabled && onTimeChange(slot.label)}
      >
        <span className="text-[0.75rem] md:text-[0.875rem] leading-[1.1] whitespace-nowrap select-none">
          {slot.label}
        </span>
        {reserved && (
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-white text-[#0f0f11] text-[0.75rem] leading-[1.1] whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity z-10">
            Not available
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={`relative flex flex-col gap-6 md:gap-8 ${className ?? ""}`}>
      {loading && (
        <div className="absolute inset-0 z-10 bg-black/40 pointer-events-auto" />
      )}
      {/* === Mobile: swipe date scroll === */}
      <div className="md:hidden -mx-4">
        <div
          ref={mobileDateRef}
          className="overflow-x-auto [&::-webkit-scrollbar]:hidden"
        >
          <div className="flex">
            {dates.map((d, i) => dayNameCell(d, `mn-${i}`, true))}
          </div>
          <div className="flex">
            {dates.map((d, i) => dateCell(d, `md-${i}`, true))}
          </div>
        </div>
      </div>

      {/* === Desktop: windowed date slider with arrows === */}
      <div className="hidden md:flex items-center gap-3">
        <NavButton
          onClick={() => setDateWindowStart((s) => s - 1)}
          disabled={!canPrevDate}
        />
        <div className="flex-1 flex flex-col min-w-0">
          <div className="flex">
            {visibleDates.map((d, i) => dayNameCell(d, `dn-${i}`))}
          </div>
          <div className="flex">
            {visibleDates.map((d, i) => dateCell(d, `dd-${i}`))}
          </div>
        </div>
        <NavButton
          onClick={() => setDateWindowStart((s) => s + 1)}
          disabled={!canNextDate}
          rotate
        />
      </div>

      {/* === Mobile: swipe time scroll === */}
      <div className="md:hidden -mx-4">
        <div
          ref={mobileTimeRef}
          className="overflow-x-auto [&::-webkit-scrollbar]:hidden"
        >
          <div className="flex">
            {HOUR_SLOTS.map((slot) => timeCell(slot, `mt-${slot.hour}`, true))}
          </div>
        </div>
      </div>

      {/* === Desktop: windowed time slider with arrows === */}
      <div className="hidden md:flex items-center gap-3">
        <NavButton
          onClick={() => setTimeWindowStart((s) => s - 1)}
          disabled={!canPrevTime}
        />
        <div className="flex-1 flex gap-2 h-9 items-stretch min-w-0">
          {visibleTimes.map((slot) => timeCell(slot, `dt-${slot.hour}`))}
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
      <svg
        width="21"
        height="20"
        viewBox="0 0 21 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0.292892 9.29289C-0.0976315 9.68342 -0.0976315 10.3166 0.292892 10.7071L6.65685 17.0711C7.04738 17.4616 7.68054 17.4616 8.07107 17.0711C8.46159 16.6805 8.46159 16.0474 8.07107 15.6569L2.41421 10L8.07107 4.34315C8.46159 3.95262 8.46159 3.31946 8.07107 2.92893C7.68054 2.53841 7.04738 2.53841 6.65685 2.92893L0.292892 9.29289ZM21 10V9L1 9V10V11L21 11V10Z"
          fill="white"
        />
      </svg>
    </button>
  );
}
