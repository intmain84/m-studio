"use client";

import { useModal } from "@/context/ModalContext";
import { useEffect, useState } from "react";

type Room = "self" | "main" | null;

export default function RoomSelector() {
  const [hovered, setHovered] = useState<Room>(null);
  const [isTouch, setIsTouch] = useState(false);
  const { setModal, setRoom } = useModal();

  useEffect(() => {
    setIsTouch(window.innerWidth < 768);
  }, []);

  return (
    <section className="relative flex items-center justify-between w-full h-dvh bg-background overflow-hidden flex-col md:flex-row py-16 md:py-0 md:px-[calc(20.83%-7.9375rem)]">
      {/* Self Room circle */}
      <button
        className="shrink-0 size-43 md:size-63.5 rounded-full border flex items-center justify-center cursor-pointer transition-colors duration-500"
        style={{
          borderColor:
            hovered === "self"
              ? "rgba(255,255,255,1)"
              : "rgba(255,255,255,0.2)",
        }}
        onMouseEnter={() => setHovered("self")}
        onMouseLeave={() => setHovered(null)}
        onClick={() => {
          if (isTouch) {
            setHovered("self");
          } else {
            setRoom("self");
            setModal("book");
          }
        }}
      >
        SELF ROOM
      </button>

      {/* Top/Left line */}
      <div className="relative flex-1 flex flex-col md:flex-row justify-start md:justify-start items-center md:items-center md:h-px">
        <div
          className="absolute top-0 md:top-auto md:left-0 w-px md:w-auto md:h-px transition-all duration-500"
          style={isTouch
            ? { height: hovered === "self" ? "50%" : "0", background: "#fff" }
            : { width: hovered === "self" ? "50%" : "0", background: "#fff" }
          }
        >
          <div
            className={`absolute size-1.5 rounded-full bg-foreground transition-opacity duration-300 ${hovered === "self" ? "opacity-100" : "opacity-0"}`}
            style={isTouch
              ? { bottom: 0, left: "50%", transform: "translateX(-50%)" }
              : { right: 0, top: "50%", transform: "translateY(-50%)" }
            }
          />
        </div>
      </div>

      {/* Center content */}
      <div className="shrink-0 text-center w-68">
        <p
          className={`hidden md:block text-[3.5rem] text-foreground uppercase leading-[1.1] transition-opacity duration-300 ${hovered === null ? "opacity-100" : "opacity-0"}`}
        >
          [Choose your space]
        </p>
        <p
          className={`absolute inset-0 m-auto text-sm text-foreground leading-[1.1] transition-opacity duration-300 w-68 h-fit ${hovered === "self" ? "opacity-100" : "opacity-0"}`}
        >
          A completely private space with just you, a large mirror, and a
          clicker in your hand.
          <br />
          <br />
          Premium camera and professional lighting are already perfectly tuned
          for high-end results.
        </p>
        <p
          className={`absolute inset-0 m-auto text-sm text-foreground leading-[1.1] transition-opacity duration-300 w-68 h-fit ${hovered === "main" ? "opacity-100" : "opacity-0"}`}
        >
          A versatile professional studio designed for commercial shoots and
          editorial projects.
          <br />
          <br />
          High-ceiling space equipped with pro-grade gear to bring your most
          complex visions to life.
        </p>
      </div>

      {/* Bottom/Right line */}
      <div className="relative flex-1 flex flex-col md:flex-row justify-end md:justify-end items-center md:items-center md:h-px">
        <div
          className="absolute bottom-0 md:bottom-auto md:right-0 w-px md:w-auto md:h-px transition-all duration-500"
          style={isTouch
            ? { height: hovered === "main" ? "50%" : "0", background: "#fff" }
            : { width: hovered === "main" ? "50%" : "0", background: "#fff" }
          }
        >
          <div
            className={`absolute size-1 rounded-full bg-foreground transition-opacity duration-300 ${hovered === "main" ? "opacity-100" : "opacity-0"}`}
            style={isTouch
              ? { top: 0, left: "50%", transform: "translateX(-50%)" }
              : { left: 0, top: "50%", transform: "translateY(-50%)" }
            }
          />
        </div>
      </div>

      {/* Main Room circle */}
      <button
        className="shrink-0 size-43 md:size-63.5 rounded-full border flex items-center justify-center cursor-pointer transition-colors duration-500"
        style={{
          borderColor:
            hovered === "main"
              ? "rgba(255,255,255,1)"
              : "rgba(255,255,255,0.2)",
        }}
        onMouseEnter={() => setHovered("main")}
        onMouseLeave={() => setHovered(null)}
        onClick={() => {
          if (isTouch) {
            setHovered("main");
          } else {
            setRoom("main");
            setModal("book");
          }
        }}
      >
        <span className="text-foreground text-[1rem] uppercase leading-[1.1]">
          MAIN ROOM
        </span>
      </button>
    </section>
  );
}
