"use client";
import { Dialog } from "radix-ui";
import { useModal } from "@/context/ModalContext";
import { cn } from "@/lib/utils";
import ModalClose from "@/components/ui/ModalClose";

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
            "fixed inset-0 overflow-y-auto bg-background z-1000000 flex flex-col",
            "data-[state=open]:animate-modal-in data-[state=closed]:animate-modal-out",
            // Desktop: centered, auto-sized
            "md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-100 md:h-auto md:min-h-120 md:flex md:flex-col md:overflow-hidden",
            className,
          )}
        >
          {children}
          <ModalClose />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default BaseModal;
