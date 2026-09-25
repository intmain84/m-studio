"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

import PhotoLightbox from "@/components/modals/PhotoLightbox";
import { ABOUT_PHOTOS } from "@/content/about-photos";

// Keeps the scroll speed the same no matter how many photos there are (was 40s for 9).
const SECONDS_PER_PHOTO = 4.5;

// Mobile shows 3 photos across, desktop 6 (gap 0.5rem / 1.5rem).
const SLIDE_CLASS =
  "relative shrink-0 aspect-2/3 mr-2 w-[calc((100vw_-_1rem)_/_3)] md:mr-6 md:w-[calc((100vw_-_7.5rem)_/_6)]";

export default function AboutGallery() {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [inView, setInView] = useState(false);
  const stripRef = useRef<HTMLDivElement>(null);

  // Run the marquee only while the strip is on screen (and no lightbox covers it).
  // Pausing (not resetting) keeps the position, so it resumes without a jump.
  useEffect(() => {
    const el = stripRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) =>
      setInView(entry.isIntersecting),
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const paused = !inView || open;

  return (
    <>
      <div ref={stripRef} className="group w-full overflow-hidden">
        {/* Two identical sets side by side: translating by -50% loops seamlessly. */}
        <div
          style={{
            animationDuration: `${ABOUT_PHOTOS.length * SECONDS_PER_PHOTO}s`,
          }}
          className={`flex w-max animate-marquee will-change-transform group-hover:[animation-play-state:paused] motion-reduce:animate-none ${
            paused ? "[animation-play-state:paused]" : ""
          }`}
        >
          {[0, 1].map((copy) =>
            ABOUT_PHOTOS.map((photo, i) => (
              <button
                key={`${copy}-${photo.src}`}
                type="button"
                aria-label={`Open photo ${i + 1}`}
                aria-hidden={copy === 1 || undefined}
                tabIndex={copy === 1 ? -1 : undefined}
                onClick={() => {
                  setIndex(i);
                  setOpen(true);
                }}
                className={`${SLIDE_CLASS} cursor-zoom-in`}
              >
                <Image
                  src={photo.src}
                  alt={copy === 0 ? photo.alt : ""}
                  fill
                  draggable={false}
                  className="object-cover"
                />
              </button>
            )),
          )}
        </div>
      </div>

      <PhotoLightbox
        photos={ABOUT_PHOTOS}
        open={open}
        startIndex={index}
        onClose={() => setOpen(false)}
      />
    </>
  );
}
