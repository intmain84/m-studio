const TIME_SLOTS = ["10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM"];

const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function generateDates(count = 8) {
  const result = [];
  const today = new Date();
  for (let i = 0; i < count; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    result.push({
      key: d.toISOString().slice(0, 10),
      day: DAY_NAMES[d.getDay()],
      date: d.getDate(),
      month: MONTH_NAMES[d.getMonth()],
    });
  }
  return result;
}

type DateTimePickerProps = {
  selectedDate: string | undefined;
  selectedTime: string | undefined;
  onDateChange: (date: string) => void;
  onTimeChange: (time: string) => void;
};

export default function DateTimePicker({
  selectedDate,
  selectedTime,
  onDateChange,
  onTimeChange,
}: DateTimePickerProps) {
  const dates = generateDates(8);

  return (
    <div className="flex flex-col gap-4">
      {/* Date grid: scrolls horizontally as one unit */}
      <div className="overflow-x-auto -mx-4 px-4">
        <div className="flex flex-col" style={{ minWidth: "max-content" }}>
          {/* Day names */}
          <div className="flex">
            {dates.map((d) => (
              <div key={d.key + "-name"} className="w-12 shrink-0 text-center pb-1">
                <span className="text-[0.625rem] text-foreground-muted">{d.day}</span>
              </div>
            ))}
          </div>
          {/* Date buttons */}
          <div className="flex">
            {dates.map((d) => (
              <button
                key={d.key}
                type="button"
                onClick={() => onDateChange(d.key)}
                className={`w-12 h-20 shrink-0 flex flex-col items-center justify-center gap-1 cursor-pointer transition-colors ${
                  selectedDate === d.key ? "bg-foreground/20" : "hover:bg-foreground/10"
                }`}
              >
                <span className="text-base text-foreground">{d.date}</span>
                <span className="text-[0.625rem] text-foreground-muted">{d.month}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Time slots */}
      <div className="overflow-x-auto -mx-4 px-4">
        <div className="flex gap-2" style={{ minWidth: "max-content" }}>
          {TIME_SLOTS.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => onTimeChange(t)}
              className={`shrink-0 px-4 h-9 text-xs text-foreground border border-foreground/30 cursor-pointer transition-colors whitespace-nowrap ${
                selectedTime === t ? "bg-foreground/20" : "hover:bg-foreground/10"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
