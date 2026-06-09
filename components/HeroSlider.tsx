"use client";

import { slides } from "@/content/homepage/slides";
import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

const AUTOPLAY_DELAY = 5000;

export default function HeroSlider() {
  const autoplay = useRef(
    Autoplay({ delay: AUTOPLAY_DELAY, stopOnInteraction: false }),
  );
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Fade(),
    autoplay.current,
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [progressKey, setProgressKey] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setProgressKey((k) => k + 1);
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      if (document.body.style.overflow !== "hidden") {
        autoplay.current.reset();
        setProgressKey((k) => k + 1);
      }
    });
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["style"],
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = useCallback(
    (index: number) => {
      emblaApi?.scrollTo(index);
      autoplay.current.reset();
    },
    [emblaApi],
  );

  const activeSlide = slides[selectedIndex];

  return (
    <section className="relative h-dvh w-full overflow-hidden">
      <div ref={emblaRef} className="absolute h-full w-full">
        <div className="flex h-full">
          {slides.map((slide, i) => (
            <div key={i} className="relative flex-[0_0_100%] h-full min-w-0">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-cover"
                priority={i === 0}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(262deg, rgba(0,0,0,0.00) 57.65%, rgba(0,0,0,0.73) 97.18%)",
        }}
      />

      {/* Content */}
      <div className="flex flex-col justify-between relative z-1000 h-full max-w-[80%] m-auto pt-33.25 pb-19.5">
        <h1 className="text-[107px] font-medium text-white uppercase leading-[100%] mb-3 whitespace-pre-line">
          {activeSlide.title}
        </h1>
        <div className="relative">
          <div>
            <p className="text-white max-w-xs text-sm leading-relaxed whitespace-pre-line">
              {activeSlide.text}
            </p>
            <button>Book Session</button>
          </div>
          {/* Dots */}
          <div className="absolute bottom-0 right-50 flex gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollTo(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === selectedIndex
                    ? "w-5 h-5 bg-background border-foreground border-3"
                    : "w-5 h-5 bg-foreground border-background border-[1.5px]"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
        <div
          key={progressKey}
          className="h-full"
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
      `}</style>
    </section>
  );
}
