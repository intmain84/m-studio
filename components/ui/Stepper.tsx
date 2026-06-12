type StepperProps = {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
};

export default function Stepper({ value, onChange, min = 1, max = 20 }: StepperProps) {
  return (
    <div className="flex items-center w-[12.5rem]">
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        className="size-14 rounded-full border border-white/20 flex items-center justify-center text-foreground text-lg cursor-pointer hover:bg-foreground/10 transition-colors shrink-0"
      >
        −
      </button>
      <div className="flex-1 h-14 border border-white/20 flex items-center justify-center text-foreground text-[0.875rem] leading-[1.1]">
        {value}
      </div>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        className="size-14 rounded-full border border-white/20 flex items-center justify-center text-foreground text-lg cursor-pointer hover:bg-foreground/10 transition-colors shrink-0"
      >
        +
      </button>
    </div>
  );
}
