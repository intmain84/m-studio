"use client";

import { useState } from "react";
import ContainerLarge from "./common/ContainerLarge";
import PaddingGlobal from "./common/PaddingGlobal";
import SpacerLarge from "./common/SpacerLarge";

// Illustration assets (from Figma — replace with permanent assets)
const selfIllustrations = [
  "https://www.figma.com/api/mcp/asset/19058f43-0d5f-4a3b-b32d-c96a511b68fe",
  "https://www.figma.com/api/mcp/asset/351effff-0378-45f8-9076-a01edea890ec",
  "https://www.figma.com/api/mcp/asset/8ce5d552-ff61-4b20-bfd3-c79bd80d5755",
  "https://www.figma.com/api/mcp/asset/2df49202-e178-4d42-999d-7dba90eea091",
  "https://www.figma.com/api/mcp/asset/2c631fed-67bd-4c6d-92b5-04cb7d8b5ad7",
];

type Step = { img: string; label: string; desc: string; num: string };

const stepsData: Record<"self" | "main", Step[]> = {
  self: [
    { img: selfIllustrations[0], label: "Book", desc: "your private slot online through our intuitive system.", num: "01" },
    { img: selfIllustrations[1], label: "Arrive", desc: "at the studio and enter your dedicated space.", num: "02" },
    { img: selfIllustrations[2], label: "Capture", desc: "your best angles using the wireless remote shutter.", num: "03" },
    { img: selfIllustrations[3], label: "Receive", desc: "your high-resolution digital gallery via a secure link.", num: "04" },
    { img: selfIllustrations[4], label: "Download", desc: "your photos within 14 days after the photo shoot.", num: "05" },
  ],
  main: [
    // TODO: replace with Main Room specific content
    { img: selfIllustrations[0], label: "Book", desc: "your private slot online through our intuitive system.", num: "01" },
    { img: selfIllustrations[1], label: "Arrive", desc: "at the studio and enter your dedicated space.", num: "02" },
    { img: selfIllustrations[2], label: "Capture", desc: "your best angles using the wireless remote shutter.", num: "03" },
    { img: selfIllustrations[3], label: "Receive", desc: "your high-resolution digital gallery via a secure link.", num: "04" },
    { img: selfIllustrations[4], label: "Download", desc: "your photos within 14 days after the photo shoot.", num: "05" },
  ],
};

type RoomKey = "self" | "main";

const rooms: Record<RoomKey, string> = {
  self: "Self Room",
  main: "Main Room",
};

function StepCard({ step, mobile = false }: { step: Step; mobile?: boolean }) {
  return (
    <div
      className={`flex flex-col ${mobile ? "w-[144px] gap-6" : "gap-8"}`}
    >
      <img
        src={step.img}
        alt={step.label}
        className={
          mobile
            ? "w-[144px] h-[144px] object-contain shrink-0"
            : "w-full aspect-square object-contain"
        }
      />
      <p className={`leading-[1.1] grow ${mobile ? "text-xs" : "text-sm"}`}>
        <span className="text-white">{step.label} </span>
        <span className="text-foreground-muted">{step.desc}</span>
      </p>
      <div className="border border-white/20 flex items-center justify-center rounded-full w-[50px] h-[50px] shrink-0">
        <span className={`text-white leading-[1.1] ${mobile ? "text-xs" : "text-sm"}`}>
          {step.num}
        </span>
      </div>
    </div>
  );
}

export default function HowItWorksSection() {
  const [activeRoom, setActiveRoom] = useState<RoomKey>("self");
  const steps = stepsData[activeRoom];

  return (
    <section>
      <SpacerLarge />
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
                  onClick={() => setActiveRoom(key)}
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

          {/* Desktop steps — 5-column grid */}
          <div className="hidden lg:grid lg:grid-cols-5 lg:gap-8">
            {steps.map((step) => (
              <StepCard key={step.num} step={step} />
            ))}
          </div>
        </ContainerLarge>
      </PaddingGlobal>

      {/* Mobile steps — horizontal scroll */}
      <div className="lg:hidden overflow-x-auto [&::-webkit-scrollbar]:hidden [scrollbar-width:none]">
        <div className="flex gap-6 px-4 pb-2 w-max">
          {steps.map((step) => (
            <StepCard key={step.num} step={step} mobile />
          ))}
        </div>
      </div>
    </section>
  );
}
