"use client";

import { createContext, useContext, useState } from "react";
import { ModalType } from "@/types/modal";

type Room = "self" | "main";

type ModalContextType = {
  modal: ModalType | null;
  setModal: (modal: ModalType | null) => void;
  room: Room | null;
  setRoom: (room: Room | null) => void;
};

const ModalContext = createContext<ModalContextType | null>(null);

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [modal, setModal] = useState<ModalType | null>(null);
  const [room, setRoom] = useState<Room | null>(null);

  return (
    <ModalContext.Provider value={{ modal, setModal, room, setRoom }}>
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error("useModal must be used within ModalProvider");
  return ctx;
}
