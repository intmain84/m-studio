type StepperProps = {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
};

export default function Stepper({
  value,
  onChange,
  min = 1,
  max = 20,
}: StepperProps) {
  return (
    <div className="flex items-center gap-4 w-50">
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        className="size-14 rounded-full border border-white/20 flex items-center justify-center text-foreground text-lg cursor-pointer hover:border-white transition-colors shrink-0"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
        >
          <line
            x1="19"
            y1="10.9833"
            x2="1"
            y2="10.9833"
            stroke="white"
            strokeWidth="1.3"
          />
        </svg>
      </button>
      <div className="flex-1 h-14 border border-white/20 flex items-center justify-center text-foreground text-[0.875rem] leading-[1.1]">
        {value}
      </div>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        className="size-14 rounded-full border border-white/20 flex items-center justify-center text-foreground text-lg cursor-pointer hover:border-white transition-colors shrink-0"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="21"
          viewBox="0 0 20 21"
          fill="none"
        >
          <line
            x1="10.65"
            y1="1.33325"
            x2="10.65"
            y2="20.3333"
            stroke="white"
            strokeWidth="1.3"
          />
          <line
            x1="19"
            y1="10.9833"
            x2="1"
            y2="10.9833"
            stroke="white"
            strokeWidth="1.3"
          />
        </svg>
      </button>
    </div>
  );
}
