"use client";

import { useState } from "react";
import ContainerLarge from "../common/ContainerLarge";
import PaddingGlobal from "../common/PaddingGlobal";
import SpacerLarge from "../common/SpacerLarge";
import { ROOMS, Step } from "@/content/rooms";

type RoomKey = "self" | "main";

const rooms: Record<RoomKey, string> = {
  self: "Self Room",
  main: "Main Room",
};

function StepCard({ step }: { step: Step }) {
  return (
    <div className="flex flex-col gap-6 lg:gap-8 w-37.5 shrink-0 lg:w-auto lg:shrink lg:min-w-0">
      <img
        src={step.img}
        alt={step.label}
        className="w-37.5 h-37.5 lg:w-full lg:h-auto lg:aspect-square object-contain shrink-0"
      />
      <p className="text-xs lg:text-sm leading-[1.1] grow">
        <span className="text-white">{step.label} </span>
        <span className="text-foreground-muted">{step.desc}</span>
      </p>
      <div className="border border-white/20 flex items-center justify-center rounded-full w-12.5 h-12.5 shrink-0">
        <span className="text-xs lg:text-sm text-white leading-[1.1]">
          {step.num}
        </span>
      </div>
    </div>
  );
}

export default function HowItWorksSection() {
  const [activeRoom, setActiveRoom] = useState<RoomKey>("self");
  const [visible, setVisible] = useState(true);
  const steps = ROOMS[activeRoom].steps;

  function switchRoom(key: RoomKey) {
    setVisible(false);
    setTimeout(() => {
      setActiveRoom(key);
      setVisible(true);
    }, 200);
  }

  return (
    <section>
      <SpacerLarge id="howitworks" />
      <PaddingGlobal>
        <ContainerLarge>
          <h2 className="text-[1.5rem] lg:text-[3.5rem] text-white uppercase leading-[1.1] mb-6 lg:mb-10">
            [How It Works]
          </h2>

          {/* Tabs */}
          <div className="flex mb-8 lg:mb-10">
            {(Object.keys(rooms) as RoomKey[]).map((key) => {
              const isActive = activeRoom === key;
              return (
                <button
                  key={key}
                  onClick={() => switchRoom(key)}
                  className={`flex-1 lg:flex-none px-6 py-4 text-sm lg:text-base leading-[1.1] cursor-pointer transition-colors duration-200 ${
                    isActive
                      ? "bg-white text-[#0f0f11]"
                      : "border border-white/20 text-white hover:border-foreground"
                  }`}
                >
                  {rooms[key]}
                </button>
              );
            })}
          </div>

          {/* Steps — flex scroll on mobile, 5-column grid on desktop */}
          <div
            className={`overflow-x-auto lg:overflow-visible [&::-webkit-scrollbar]:hidden scrollbar-none transition-opacity duration-200 ${visible ? "opacity-100" : "opacity-0"}`}
          >
            <div className="flex gap-6 lg:gap-8 lg:grid lg:grid-cols-5 w-max lg:w-auto">
              {steps.map((step) => (
                <StepCard key={step.num} step={step} />
              ))}
            </div>
          </div>
        </ContainerLarge>
      </PaddingGlobal>
    </section>
  );
}
