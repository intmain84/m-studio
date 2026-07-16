type TarifOptionProps = {
  label: string; // e.g. "499 AED (1 hour)"
  selected: boolean;
  onSelect: () => void;
  className?: string;
};

export default function TarifOption({
  label,
  selected,
  onSelect,
  className,
}: TarifOptionProps) {
  // Split "499 AED (1 hour)" → ["499 AED ", "(1 hour)"]
  const parenIdx = label.indexOf("(");
  const amount = parenIdx !== -1 ? label.slice(0, parenIdx) : label;
  const duration = parenIdx !== -1 ? label.slice(parenIdx) : "";

  const borderClass = selected
    ? "border border-foreground bg-foreground text-background"
    : "border border-white/20 text-foreground";

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`w-full flex items-center justify-center px-6 py-4 cursor-pointer transition-colors duration-200 ${borderClass} hover:border-white ${className}`}
    >
      <span className="flex justify-between text-[0.875rem] leading-[1.1] text-center w-full">
        <span className={selected ? "text-background" : "text-foreground"}>
          {amount}
        </span>
        {duration && <span>{duration}</span>}
      </span>
    </button>
  );
}
