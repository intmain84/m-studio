"use client";

import Navbar from "./Navbar";
import { ModalProvider } from "@/context/ModalContext";
import CallbackModal from "./modals/CallbackModal";

const StateWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <ModalProvider>
      <Navbar />
      <main className="flex-1">{children}</main>
      <CallbackModal />
    </ModalProvider>
  );
};

export default StateWrapper;
