"use client";
import { Dialog } from "radix-ui";
import { useModal } from "@/context/ModalContext";
import { cn } from "@/lib/utils";

type BaseModalProps = {
  children: React.ReactNode;
  open: boolean;
  className?: string;
};

const BaseModal = ({ children, open, className }: BaseModalProps) => {
  const { setModal } = useModal();

  return (
    <Dialog.Root open={open} onOpenChange={() => setModal(null)}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-9999 md:bg-black/30 md:backdrop-blur-md data-[state=open]:animate-modal-in data-[state=closed]:animate-modal-out" />
        <Dialog.Content
          className={cn(
            // Mobile: full screen, scrollable
            "fixed inset-0 overflow-y-auto bg-background z-1000000",
            "data-[state=open]:animate-modal-in data-[state=closed]:animate-modal-out",
            // Desktop: centered, auto-sized
            "md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-[25rem] md:h-auto md:overflow-hidden",
            className,
          )}
        >
          {children}
          <Dialog.Close asChild>
            <button
              className="absolute top-4 right-4 text-white z-10 cursor-pointer"
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
                    stroke="white"
                    strokeWidth="2"
                  />
                  <line
                    x1="-1.27727"
                    y1="-1.31453"
                    x2="20.7068"
                    y2="20.6695"
                    stroke="white"
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
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default BaseModal;
