"use client";
import { useState } from "react";
import Image from "next/image";

import PhotoLightbox from "@/components/modals/PhotoLightbox";
import { ABOUT_PHOTOS } from "@/content/about-photos";

// Mobile shows 3 photos across, desktop 6 (gap 0.5rem / 1.5rem).
const SLIDE_CLASS =
  "relative shrink-0 aspect-2/3 mr-2 w-[calc((100vw_-_1rem)_/_3)] md:mr-6 md:w-[calc((100vw_-_7.5rem)_/_6)]";

export default function AboutGallery() {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  return (
    <>
      <div className="group w-full overflow-hidden">
        {/* Two identical sets side by side: translating by -50% loops seamlessly. */}
        <div className="flex w-max animate-marquee will-change-transform group-hover:[animation-play-state:paused] motion-reduce:animate-none">
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
