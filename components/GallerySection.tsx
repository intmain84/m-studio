"use client";

import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import Image from "next/image";
import "swiper/css";
import SpacerLarge from "./common/SpacerLarge";
import PaddingGlobal from "./common/PaddingGlobal";
import ContainerLarge from "./common/ContainerLarge";

const rooms = {
  self: {
    label: "Self Room",
    images: [
      "https://picsum.photos/seed/selfroom1/1424/612",
      "https://picsum.photos/seed/selfroom2/1424/612",
      "https://picsum.photos/seed/selfroom3/1424/612",
    ],
  },
  main: {
    label: "Main Room",
    images: [
      "https://picsum.photos/seed/mainroom1/1424/612",
      "https://picsum.photos/seed/mainroom2/1424/612",
      "https://picsum.photos/seed/mainroom3/1424/612",
    ],
  },
};

type RoomKey = keyof typeof rooms;

function PrevIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path
        d="M12.5 15L7.5 10L12.5 5"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function NextIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path
        d="M7.5 5L12.5 10L7.5 15"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function GallerySection() {
  const [activeRoom, setActiveRoom] = useState<RoomKey>("self");
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);

  const images = rooms[activeRoom].images;

  return (
    <section className="flex flex-col">
      <SpacerLarge />
      <PaddingGlobal>
        <ContainerLarge>
          <h2 className="text-[1.5rem] md:text-[3.5rem] text-white uppercase leading-[1.1] mb-6 md:mb-10">
            [How It Looks]
          </h2>
          <div className="flex mb-6 md:mb-8">
            {(Object.keys(rooms) as RoomKey[]).map((key) => {
              const isActive = activeRoom === key;
              return (
                <button
                  key={key}
                  onClick={() => {
                    setActiveRoom(key);
                    setActiveIndex(0);
                  }}
                  className={`flex-1 md:flex-none px-6 py-4 text-sm md:text-base leading-[1.1] cursor-pointer transition-colors duration-200 ${
                    isActive
                      ? "bg-white text-[#0f0f11]"
                      : "border border-white/20 text-white hover:border-foreground"
                  }`}
                >
                  {rooms[key].label}
                </button>
              );
            })}
          </div>
        </ContainerLarge>
      </PaddingGlobal>

      <div className="px-2 relative">
        <Swiper
          key={activeRoom}
          loop
          onSwiper={(s) => {
            swiperRef.current = s;
          }}
          onSlideChange={(s) => setActiveIndex(s.realIndex)}
          className="w-full"
        >
          {images.map((src, i) => (
            <SwiperSlide key={i}>
              <div className="relative w-full aspect-square md:aspect-1424/612">
                <Image
                  src={src}
                  alt={`${rooms[activeRoom].label} photo ${i + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Mobile pagination dashes */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-10 flex gap-1.5 w-[87%] md:hidden">
          {images.map((_, j) => (
            <div
              key={j}
              className={`flex-1 h-px transition-colors duration-300 ${
                j === activeIndex ? "bg-white" : "bg-foreground-muted"
              }`}
            />
          ))}
        </div>

        <button
          onClick={() => swiperRef.current?.slidePrev()}
          className="hidden md:flex absolute left-8 top-1/2 -translate-y-1/2 z-10 items-center justify-center p-6 rounded-full backdrop-blur-[10px] bg-white/10 border border-white/20 cursor-pointer"
        >
          <PrevIcon />
        </button>
        <button
          onClick={() => swiperRef.current?.slideNext()}
          className="hidden md:flex absolute right-8 top-1/2 -translate-y-1/2 z-10 items-center justify-center p-6 rounded-full backdrop-blur-[10px] bg-white/10 border border-white/20 cursor-pointer"
        >
          <NextIcon />
        </button>
      </div>
    </section>
  );
}
