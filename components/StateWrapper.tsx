"use client";

import Navbar from "./Navbar";
import { ModalProvider } from "@/context/ModalContext";
import ModalRenderer from "./modals/ModalRenderer";

const StateWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <ModalProvider>
      <Navbar />
      <main className="flex-1">{children}</main>
      <ModalRenderer /> {/* Always keep it here */}
    </ModalProvider>
  );
};

export default StateWrapper;
