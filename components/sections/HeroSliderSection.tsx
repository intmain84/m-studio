"use client";

import Image from "next/image";
import Button from "../ui/Button";
import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/effect-fade";
import { useModal } from "@/context/ModalContext";
import { Room } from "@/types/modal";

type Slide = {
  title: string;
  text: string;
  image: string;
  progressColor: string;
  room?: Room;
};

// \n in title and text is rendered as a line break (requires whitespace-pre-line on the element)
const slides: Slide[] = [
  {
    title: "1 studio\n2 spaces",
    text: "A completely private space with just you, a large mirror, and a clicker in your hand.\n\nPremium camera and professional lighting are already perfectly tuned.",
    image: "/hero-slides/1.jpg",
    progressColor: "light",
  },
  {
    title: "Self\nRoom",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec suscipit auctor dui, at convallis nisl.",
    image: "/hero-slides/2.jpg",
    progressColor: "dark",
    room: "self",
  },
  {
    title: "main\nRoom",
    text: "A completely private space with just you, a large mirror, and a clicker in your hand.\n\nPremium camera and professional lighting are already perfectly tuned.",
    image: "/hero-slides/3.jpg",
    progressColor: "light",
    room: "main",
  },
];

const AUTOPLAY_DELAY = 5000;

export default function HeroSliderSection() {
  const { setModal } = useModal();
  const swiperRef = useRef<SwiperType | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [progressKey, setProgressKey] = useState(0);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      if (document.body.style.overflow !== "hidden") {
        swiperRef.current?.autoplay.start();
        setProgressKey((k) => k + 1);
      }
    });
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["style"],
    });
    return () => observer.disconnect();
  }, []);

  const activeSlide = slides[selectedIndex];

  return (
    <section className="relative h-dvh w-full overflow-hidden">
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        loop
        autoplay={{ delay: AUTOPLAY_DELAY, disableOnInteraction: false }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={(swiper) => {
          setSelectedIndex(swiper.realIndex);
          setProgressKey((k) => k + 1);
        }}
        className="absolute h-full w-full z-0!"
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={i} className="relative h-full">
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover"
              priority={i === 0}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(262deg, rgba(0,0,0,0.00) 57.65%, rgba(0,0,0,0.3) 120.18%)",
        }}
      />

      {/* Content */}
      <div
        key={selectedIndex}
        className="absolute inset-0 flex flex-col z-10 h-full px-4 mx-auto justify-end animate-fade-in pointer-events-none md:justify-between pb-4 md:pb-19.5 md:max-w-[80%] md:pt-33.25"
      >
        <div className="relative md:h-full">
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-1 md:grid-rows-[1fr_auto_auto] md:h-full">
            <h1
              className={`font-medium text-white uppercase leading-[100%] md:mb-3 whitespace-pre-line ${selectedIndex === 0 ? "text-[32px] md:text-[74px]" : "text-[56px] md:text-[107px]"}`}
            >
              {activeSlide.title}
            </h1>
            <p className="text-white max-w-xs text-sm leading-relaxed whitespace-pre-line md:max-w-67.5">
              {activeSlide.text}
            </p>
            <Button
              variant={activeSlide.progressColor as "light" | "dark"}
              className="col-span-2 md:col-span-1 pointer-events-auto md:max-w-67.5"
              onClick={() => setModal({ type: "book", room: activeSlide.room })}
            >
              Book Session
            </Button>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8 pointer-events-auto md:mt-0 md:absolute md:bottom-0 md:right-50">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => swiperRef.current?.slideToLoop(i)}
                className={`cursor-pointer rounded-full transition-all duration-300 w-4 h-4 md:w-5 md:h-5 ${
                  i === selectedIndex
                    ? "bg-background border-foreground border-3"
                    : "bg-foreground border-background border-[1.5px]"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 z-10">
        <div
          key={progressKey}
          className={`h-full ${activeSlide.progressColor === "light" ? "bg-foreground text-background" : "bg-background text-foreground"}`}
          style={{
            backgroundColor: activeSlide.progressColor,
            animation: `progress ${AUTOPLAY_DELAY}ms linear forwards`,
          }}
        />
      </div>

      <style>{`
        @keyframes progress {
          from { width: 0% }
          to { width: 100% }
        }
        @keyframes fade-in {
          from { opacity: 0 }
          to { opacity: 1 }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease forwards;
        }
      `}</style>
    </section>
  );
}
