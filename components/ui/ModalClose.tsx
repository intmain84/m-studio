import { Dialog } from "radix-ui";
import { cn } from "@/lib/utils";

type ModalCloseProps = {
  className?: string;
};

export default function ModalClose({ className }: ModalCloseProps) {
  return (
    <Dialog.Close asChild>
      <button
        className={cn(
          "absolute top-4 right-4 text-white z-10 cursor-pointer",
          className,
        )}
        aria-label="Close"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
        >
          <g clipPath="url(#clip0_2710_2343)">
            <line
              x1="-1.24031"
              y1="19.2192"
              x2="20.2931"
              y2="-2.31423"
              stroke="currentColor"
              strokeWidth="2"
            />
            <line
              x1="-1.27727"
              y1="-1.31453"
              x2="20.7068"
              y2="20.6695"
              stroke="currentColor"
              strokeWidth="2"
            />
          </g>
          <defs>
            <clipPath id="clip0_2710_2343">
              <rect width="18" height="18" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </button>
    </Dialog.Close>
  );
}
