"use client";

import { useState } from "react";

type AccordionItem = {
  title: string;
  content: React.ReactNode;
};

type AccordionProps = {
  items: AccordionItem[];
  className?: string;

  // Border
  borderColor?: string;        // default: "border-border"
  borderHoverColor?: string;   // default: "hover:border-foreground"
  borderWidth?: string | false; // default: "border", false — без бордера

  // Active state
  activeBackground?: string;   // default: "bg-white"
  activeTextColor?: string;    // default: "text-[#0f0f11]"
  inactiveTextColor?: string;  // default: "text-white"

  // Typography
  titleClassName?: string;     // default: "text-sm md:text-[1.125rem] leading-[1.1]"
  contentClassName?: string;   // default: "text-xs md:text-sm leading-normal"

  // Icon
  icon?: (open: boolean) => React.ReactNode;
};

function DefaultArrow({ open }: { open: boolean }) {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 transition-transform duration-300 ${open ? "rotate-180" : "rotate-0"}`}
    >
      <path
        d="M14.7018 6.92875C15.0995 7.31917 15.0993 7.95226 14.7018 8.34282L8.22008 14.7071C7.82235 15.0976 7.17765 15.0976 6.77991 14.7071L0.298149 8.34281C-0.0992836 7.95226 -0.0994857 7.31917 0.298149 6.92875C0.695782 6.53832 1.34056 6.53852 1.73832 6.92875L6.48154 11.586L6.48154 1C6.48154 0.447717 6.93752 -3.52422e-07 7.5 -3.27835e-07C8.06248 -3.03249e-07 8.51846 0.447717 8.51846 1L8.51846 11.586L13.2617 6.92875C13.6594 6.53852 14.3042 6.53832 14.7018 6.92875Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function Accordion({
  items,
  className,
  borderColor = "border-border",
  borderHoverColor = "hover:border-foreground",
  borderWidth = "border" as string | false,
  activeBackground = "bg-white",
  activeTextColor = "text-[#0f0f11]",
  inactiveTextColor = "text-white",
  titleClassName = "text-sm md:text-[1.125rem] leading-[1.1]",
  contentClassName = "text-xs md:text-sm leading-normal",
  icon,
}: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className={className}>
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div
            key={i}
            className={`${borderWidth ? `${borderWidth} ${borderColor} ${borderHoverColor}` : ""} -mt-px transition-colors duration-300 ${
              isOpen ? `${activeBackground} ${activeTextColor}` : inactiveTextColor
            }`}
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="w-full flex items-center justify-between gap-4 p-6 text-left cursor-pointer"
            >
              <span className={titleClassName}>{item.title}</span>
              {icon ? icon(isOpen) : <DefaultArrow open={isOpen} />}
            </button>
            <div
              className={`grid transition-[grid-template-rows] duration-300 ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <div className={`px-6 pb-6 ${contentClassName}`}>
                  {item.content}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
