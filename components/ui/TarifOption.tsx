type TarifOptionProps = {
  label: string;   // e.g. "315 AED (1 hour)"
  selected: boolean;
  onSelect: () => void;
  isFirst?: boolean;
};

export default function TarifOption({ label, selected, onSelect, isFirst }: TarifOptionProps) {
  // Split "315 AED (1 hour)" → ["315 AED ", "1 hour)"]
  const parenIdx = label.indexOf("(");
  const amount = parenIdx !== -1 ? label.slice(0, parenIdx) : label;
  const duration = parenIdx !== -1 ? label.slice(parenIdx) : "";

  const borderClass = selected
    ? "border border-foreground bg-foreground text-background"
    : isFirst
    ? "border border-white/20 text-foreground"
    : "border-b border-l border-r border-white/20 text-foreground";

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`w-full flex items-center justify-center px-6 py-4 cursor-pointer transition-colors duration-200 ${borderClass}`}
    >
      <span className="text-[0.875rem] leading-[1.1] text-center">
        <span className={selected ? "text-background" : "text-foreground"}>{amount}</span>
        {duration && (
          <span className={selected ? "text-background/60" : "text-foreground-muted"}>
            {duration}
          </span>
        )}
      </span>
    </button>
  );
}
