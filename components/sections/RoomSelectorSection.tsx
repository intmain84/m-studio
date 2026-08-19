"use client";

import { useModal } from "@/context/ModalContext";
import { useEffect, useState } from "react";
import PaddingGlobal from "../common/PaddingGlobal";
import ContainerLarge from "../common/ContainerLarge";
import SpacerLarge from "../common/SpacerLarge";
import { ROOMS } from "@/content/rooms";

type Room = "self" | "main" | null;

export default function RoomSelectorSection() {
  const [hovered, setHovered] = useState<Room>(null);
  const [isTouch, setIsTouch] = useState(false);
  const { setModal } = useModal();

  useEffect(() => {
    setIsTouch(window.innerWidth < 768);
  }, []);

  return (
    <section>
      <SpacerLarge />
      <PaddingGlobal>
        <ContainerLarge>
          <div className="relative flex items-center w-full overflow-hidden flex-col justify-center md:flex-row md:justify-between px-0 md:px-[calc(20.83%-7.9375rem)]">
            {/* Self Room circle */}
            <button
              className={`shrink-0 size-43 md:size-63.5 rounded-full border flex items-center justify-center cursor-pointer transition-colors duration-500 ${hovered === "self" ? "border-white" : "border-white/20"}`}
              onMouseEnter={() => {
                if (!isTouch) setHovered("self");
              }}
              onMouseLeave={() => {
                if (!isTouch) setHovered(null);
              }}
              onClick={() => {
                if (isTouch) {
                  setHovered("self");
                } else {
                  setModal({ type: "room-info", room: "self" });
                }
              }}
            >
              SELF ROOM
            </button>

            {/* Left line — desktop only */}
            <div className="hidden md:flex relative flex-1 justify-start items-center h-px">
              <div
                className={`absolute left-0 h-px bg-white transition-all duration-500 ${hovered === "self" ? "w-1/2" : "w-0"}`}
              >
                <div
                  className={`absolute right-0 top-1/2 -translate-y-1/2 size-1.5 rounded-full bg-foreground transition-opacity duration-300 ${hovered === "self" ? "opacity-100" : "opacity-0"}`}
                />
              </div>
            </div>

            {/* Center content */}
            <div className="relative md:static shrink-0 w-68 text-center min-h-55 md:min-h-0 flex flex-col items-center justify-center md:block">
              {/* Mobile: top line indicator (self) */}
              <div
                className={`md:hidden absolute top-0 left-1/2 -translate-x-1/2 w-px bg-white transition-all duration-500 ${hovered === "self" ? "h-10" : "h-0"}`}
              >
                <div
                  className={`absolute bottom-0 left-1/2 -translate-x-1/2 size-1.5 rounded-full bg-foreground transition-opacity duration-300 ${hovered === "self" ? "opacity-100" : "opacity-0"}`}
                />
              </div>

              <p
                className={`text-2xl md:text-[3.5rem] text-foreground uppercase leading-[1.1] transition-opacity duration-300 ${hovered === null ? "opacity-100" : "opacity-0"}`}
              >
                [Choose your space]
              </p>
              <p
                className={`absolute inset-0 m-auto text-sm text-foreground leading-[1.1] whitespace-pre-line transition-opacity duration-300 w-68 h-fit ${hovered === "self" ? "opacity-100" : "opacity-0"}`}
              >
                You shoot. We set the stage.
              </p>
              <p
                className={`absolute inset-0 m-auto text-sm text-foreground leading-[1.1] whitespace-pre-line transition-opacity duration-300 w-80 h-fit ${hovered === "main" ? "opacity-100" : "opacity-0"}`}
              >
                Your crew. Your camera. Our light
              </p>

              {/* Mobile: bottom line indicator (main) */}
              <div
                className={`md:hidden absolute bottom-0 left-1/2 -translate-x-1/2 w-px bg-white transition-all duration-500 ${hovered === "main" ? "h-10" : "h-0"}`}
              >
                <div
                  className={`absolute top-0 left-1/2 -translate-x-1/2 size-1.5 rounded-full bg-foreground transition-opacity duration-300 ${hovered === "main" ? "opacity-100" : "opacity-0"}`}
                />
              </div>
            </div>

            {/* Right line — desktop only */}
            <div className="hidden md:flex relative flex-1 justify-end items-center h-px">
              <div
                className={`absolute right-0 h-px bg-white transition-all duration-500 ${hovered === "main" ? "w-1/2" : "w-0"}`}
              >
                <div
                  className={`absolute left-0 top-1/2 -translate-y-1/2 size-1 rounded-full bg-foreground transition-opacity duration-300 ${hovered === "main" ? "opacity-100" : "opacity-0"}`}
                />
              </div>
            </div>

            {/* Main Room circle */}
            <button
              className={`shrink-0 size-43 md:size-63.5 rounded-full border flex items-center justify-center cursor-pointer transition-colors duration-500 ${hovered === "main" ? "border-white" : "border-white/20"}`}
              onMouseEnter={() => {
                if (!isTouch) setHovered("main");
              }}
              onMouseLeave={() => {
                if (!isTouch) setHovered(null);
              }}
              onClick={() => {
                if (isTouch) {
                  setHovered("main");
                } else {
                  setModal({ type: "room-info", room: "main" });
                }
              }}
            >
              <span className="text-foreground text-[1rem] uppercase leading-[1.1]">
                MAIN ROOM
              </span>
            </button>
          </div>
        </ContainerLarge>
      </PaddingGlobal>
    </section>
  );
}
