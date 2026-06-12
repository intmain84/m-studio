"use client";

import Image from "next/image";
import Button from "../Button";
import SpacerLarge from "../common/SpacerLarge";
import PaddingGlobal from "../common/PaddingGlobal";
import ContainerLarge from "../common/ContainerLarge";
import { useModal } from "@/context/ModalContext";
import { Room } from "@/types/modal";

const spaces: Array<{
  num: string;
  name: string;
  description: string;
  tag: string;
  tags: string[];
  image: string;
  room: Room;
}> = [
  {
    num: "01",
    name: "SELF ROOM",
    description:
      "A unique date idea, fun family photos, or simply time for yourself. Change outfits, act silly, and capture genuine emotions.",
    tag: "[Total Privacy]",
    tags: ["Solo", "Family", "Love-Story"],
    image: "/spaces/selfroom.webp",
    room: "self",
  },
  {
    num: "02",
    name: "MAIN ROOM",
    description:
      "Clean, stylish shots for your resume, corporate website, or personal brand.",
    tag: "[Total Privacy]",
    tags: ["Business Portrait", "Comp Cards", "Brand Content"],
    image: "/spaces/mainroom.webp",
    room: "main",
  },
];

function SpaceCard({
  num,
  name,
  description,
  tag,
  tags,
  image,
  onClick,
}: (typeof spaces)[number] & { onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      className="flex-1 flex flex-col cursor-pointer group"
    >
      {/* Image with overlay */}
      <div className="relative aspect-square text-xs md:text-sm overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-[1.1] opacity-90"
        />

        <div className="absolute inset-0 flex flex-col p-4 md:p-8">
          {/* Top row: description (left) + num/tags + tag (right) */}
          <div className="flex justify-between items-start gap-4">
            <p className=" text-white/80 leading-snug max-w-57.75">
              {description}
            </p>
            <div className="flex flex-col items-end gap-1  text-white/80 text-right">
              {/* num — desktop only */}
              <span className="hidden md:block">{num}</span>
              {/* tags stacked — mobile only */}
              <div className="flex flex-col items-end gap-0.5 md:hidden">
                {tags.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
              <span className="mt-10">{tag}</span>
            </div>
          </div>

          <div className="flex-1" />

          {/* Bottom row: tags left (desktop) + button right */}
          <div className="flex justify-between items-end gap-4">
            <div className="hidden md:flex gap-4 text-white/80">
              {tags.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
            <Button
              variant="light"
              className="w-full md:w-auto pointer-events-none group-hover:bg-[#DCDCDC]"
            >
              Learn more
            </Button>
          </div>
        </div>

        {/* Room name — always centered in the card */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <p className="text-center text-[1.25rem] md:text-[2.5rem] uppercase text-white leading-[1.1] ">
            {name}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function SpacesSection() {
  const { setModal } = useModal();

  return (
    <section>
      <SpacerLarge />
      <PaddingGlobal>
        <ContainerLarge>
          <h2 className="text-[1.5rem] md:text-[3.5rem] text-white uppercase leading-[1.1] mb-6 md:mb-10">
            [Spaces]
          </h2>
        </ContainerLarge>
      </PaddingGlobal>
      <div className="mx-2">
        <div className="flex flex-col md:flex-row gap-2">
          {spaces.map((space) => (
            <SpaceCard
              key={space.num}
              {...space}
              onClick={() => setModal({ type: "room-info", room: space.room })}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
