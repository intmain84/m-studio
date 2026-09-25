"use client";
import { useRef } from "react";
import Image from "next/image";
import { Dialog } from "radix-ui";
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";

import ModalClose from "@/components/ui/ModalClose";
import { NextIcon, PrevIcon } from "@/components/ui/ArrowIcons";
import type { AboutPhoto } from "@/content/about-photos";

// Desktop arrows sit in the gap between the active photo and its neighbours:
// 2rem from the active photo, 4rem wide. --photo-w is set on the Content below.
const ARROW_CLASS =
  "hidden md:flex absolute top-1/2 -translate-y-1/2 z-10 size-16 items-center justify-center rounded-full border border-white/20 hover:border-white cursor-pointer transition-colors duration-300";

// Photos are 2:3. Mobile: the active photo is ~10/11 of the screen so neighbours
// peek out ~5% on each side (gap is 0.5rem). Desktop: 2.25rem above and below,
// and never wider than the screen minus room for both arrows (12rem).
// `!` is needed because swiper.css (unlayered) sets `.swiper-slide { width: 100% }`.
const SLIDE_CLASS =
  "w-[min(calc((100vw_-_1rem)_/_1.1),calc((100dvh_-_8rem)_*_2_/_3))]! md:w-(--photo-w)!";

type PhotoLightboxProps = {
  photos: AboutPhoto[];
  open: boolean;
  startIndex: number;
  onClose: () => void;
};

export default function PhotoLightbox({
  photos,
  open,
  startIndex,
  onClose,
}: PhotoLightboxProps) {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(next) => {
        if (!next) onClose();
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-9999 bg-black/30 backdrop-blur-md data-[state=open]:animate-modal-in data-[state=closed]:animate-modal-out" />
        <Dialog.Content
          aria-describedby={undefined}
          className="fixed inset-0 z-1000000 flex items-center outline-none md:[--photo-w:min(calc((100dvh_-_4.5rem)_*_2_/_3),calc(100vw_-_12rem))] data-[state=open]:animate-modal-in data-[state=closed]:animate-modal-out"
        >
          <Dialog.Title className="sr-only">Studio photos</Dialog.Title>
          <Swiper
            modules={[Keyboard]}
            keyboard={{ enabled: true }}
            loop
            centeredSlides
            slidesPerView="auto"
            spaceBetween={8}
            breakpoints={{ 768: { spaceBetween: 128 } }}
            initialSlide={startIndex}
            onSwiper={(s) => {
              swiperRef.current = s;
            }}
            className="w-full"
          >
            {photos.map((photo, i) => (
              <SwiperSlide
                key={photo.src}
                className={SLIDE_CLASS}
                onClick={() => swiperRef.current?.slideToLoop(i)}
              >
                <div className="relative aspect-2/3 w-full">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    draggable={false}
                    className="object-cover"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <button
            type="button"
            aria-label="Previous photo"
            onClick={() => swiperRef.current?.slidePrev()}
            className={`${ARROW_CLASS} md:left-[calc(50%_-_var(--photo-w)_/_2_-_6rem)]`}
          >
            <PrevIcon />
          </button>
          <button
            type="button"
            aria-label="Next photo"
            onClick={() => swiperRef.current?.slideNext()}
            className={`${ARROW_CLASS} md:right-[calc(50%_-_var(--photo-w)_/_2_-_6rem)]`}
          >
            <NextIcon />
          </button>
          <ModalClose />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
