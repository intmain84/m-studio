"use client";

import Navbar from "./Navbar";
import { ModalProvider } from "@/context/ModalContext";
import { PresetsProvider } from "@/context/PresetsContext";
import ModalRenderer from "./modals/ModalRenderer";

const StateWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <PresetsProvider>
      <ModalProvider>
        <Navbar />
        <main className="flex-1">{children}</main>
        <ModalRenderer /> {/* Always keep it here */}
      </ModalProvider>
    </PresetsProvider>
  );
};

export default StateWrapper;
