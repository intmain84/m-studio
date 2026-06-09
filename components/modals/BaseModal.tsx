// This is a base modal component that can be used for login, registration, or callback modals. It uses Radix UI's Dialog component
"use client";
import { Dialog } from "radix-ui";

type BaseModalProps = {
  children: React.ReactNode;
  open: boolean;
  setModal: (open: null) => void;
};

const BaseModal = ({ children, open, setModal }: BaseModalProps) => {
  return (
    <Dialog.Root open={open} onOpenChange={() => setModal(null)}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50 z-9999" />
        <Dialog.Content
          className="
            fixed
            left-1/2
            top-1/2
            -translate-x-1/2
            -translate-y-1/2
            w-[400px]
            h-[400px]
            bg-white
            z-10000
          "
        >
          <div>{children}</div>
        </Dialog.Content>
        <Dialog.Close asChild>
          <button
            className="fixed top-4 right-4 text-white z-9999"
            aria-label="Close"
          >
            X
          </button>
        </Dialog.Close>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default BaseModal;
