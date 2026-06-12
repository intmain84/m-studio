"use client";
import { Dialog } from "radix-ui";

import BaseModal from "./BaseModal";
import { useModal } from "@/context/ModalContext";

const GiftModal = () => {
  const { modal } = useModal();
  const open = modal?.type === "gift"; //This modal opens if it's a "gift" modal

  return (
    <BaseModal open={open}>
      <div>
        <Dialog.Title className="text-2xl font-bold mb-4">Gift</Dialog.Title>
        <Dialog.Description>Gift content coming soon.</Dialog.Description>
      </div>
    </BaseModal>
  );
};

export default GiftModal;
