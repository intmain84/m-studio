"use client";
import Image from "next/image";
import { Dialog } from "radix-ui";
import { useEffect, useState } from "react";

import BaseModal from "./BaseModal";
import Button from "@/components/ui/Button";
import { useModal } from "@/context/ModalContext";
import { ROOMS } from "@/content/rooms";

const SLIDE_INTERVAL = 4000;

function ImageFader({ images, alt }: { images: string[]; alt: string }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (images.length < 2) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, SLIDE_INTERVAL);
    return () => clearInterval(id);
  }, [images]);

  return (
    <div className="relative size-full">
      {images.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt={alt}
          fill
          priority={i === 0}
          className={`object-cover transition-opacity duration-1000 ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
    </div>
  );
}

const RoomInfoModal = () => {
  const { modal, setModal } = useModal();
  const open = modal?.type === "room-info";
  const room = modal?.type === "room-info" ? modal.room : undefined;
  const content = room ? ROOMS[room] : undefined;

  return (
    <BaseModal
      open={open}
      className="md:w-[90vw] md:max-w-312 md:h-162.5 md:overflow-hidden"
    >
      {content && (
        <div className="flex flex-col md:flex-row md:h-full md:min-h-0">
          {/* Left: content panel */}
          <div className="flex-1 flex flex-col md:min-h-0">
            {/* Scrollable on desktop; on mobile the whole modal scrolls */}
            <div
              className="flex flex-col gap-8 p-6 md:flex-1 md:min-h-0 md:overflow-y-auto
                md:scrollbar-thin md:[scrollbar-color:rgba(255,255,255,0.2)_transparent]
                md:[&::-webkit-scrollbar]:w-1.5
                md:[&::-webkit-scrollbar-track]:bg-transparent
                md:[&::-webkit-scrollbar-thumb]:rounded-full
                md:[&::-webkit-scrollbar-thumb]:bg-white/20
                md:hover:[&::-webkit-scrollbar-thumb]:bg-white/40"
            >
              <div className="flex flex-col gap-2">
                <Dialog.Title className="text-2xl md:text-[3.5rem] uppercase leading-[1.1] text-white">
                  {content.title}
                </Dialog.Title>
                {content.promo ? (
                  <div className="flex items-start justify-between gap-4 w-full text-xs md:text-base">
                    <div className="flex flex-col leading-[1.1]">
                      {content.promo.originalAmount && (
                        <span className="text-foreground-muted text-[0.75em] line-through">
                          {content.promo.originalAmount}
                        </span>
                      )}
                      <span className="text-white">
                        {content.tarifs[0].amount}
                        {content.promo.note && (
                          <span className="text-white">
                            {" "}
                            ({content.promo.note})
                          </span>
                        )}
                      </span>
                    </div>
                    {content.promo.guestsIncluded && (
                      <p className="text-foreground-muted leading-[1.1]">
                        Up to{" "}
                        <span className="text-white">
                          {content.promo.guestsIncluded} guests
                        </span>
                        <br />
                        included.
                      </p>
                    )}
                    {content.minDuration && (
                      <p className="text-foreground-muted leading-[1.1]">
                        Minimum session duration:
                        <br />
                        <span className="text-white">
                          {content.minDuration}
                        </span>
                      </p>
                    )}
                  </div>
                ) : content.minDuration ? (
                  <p className="text-xs md:text-base leading-[1.1]">
                    <span className="text-foreground-muted">
                      Minimum session duration:{" "}
                    </span>
                    <span className="text-white">{content.minDuration}</span>
                  </p>
                ) : (
                  <div className="flex items-start justify-between gap-4 w-full text-xs md:text-base text-white">
                    {content.tarifs.map((t) => (
                      <div
                        key={t.value}
                        className="flex flex-col gap-1 leading-[1.1] whitespace-nowrap"
                      >
                        <span>{t.value}r</span>
                        <span>
                          {t.amount}
                          {t.perHour && (
                            <span className="text-foreground-muted">
                              {" "}
                              ({t.perHour})
                            </span>
                          )}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <ul className="flex flex-col gap-2">
                {content.amenities.map((f, i) => (
                  <li
                    key={f}
                    className="flex gap-2 items-center text-xs md:text-sm text-white"
                  >
                    <span className="size-1 rounded-full bg-white shrink-0" />
                    {content.highlightLastAmenity &&
                    i === content.amenities.length - 1 ? (
                      <span className="bg-accent px-1">{f}</span>
                    ) : (
                      f
                    )}
                  </li>
                ))}
              </ul>

              <p className="text-foreground-muted text-xs leading-normal whitespace-pre-line">
                {content.modalDescription}
              </p>

              {content.presets && (
                <div className="flex flex-col gap-6">
                  <p className="text-2xl uppercase text-white leading-[1.1]">
                    [Presets]
                  </p>
                  <div className="flex items-start gap-4">
                    {content.presets.map((preset) => (
                      <div
                        key={preset.label}
                        className="flex-1 flex flex-col gap-4"
                      >
                        <div className="relative aspect-square bg-[#d9dbda] overflow-hidden">
                          <Image
                            src={preset.image}
                            alt={preset.label}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <p className="text-xs md:text-sm text-white">
                          {preset.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {content.steps && (
                <div className="flex flex-col gap-6">
                  <p className="text-2xl uppercase text-white leading-[1.1]">
                    [How It Works]
                  </p>
                  <div className="flex gap-6 overflow-x-auto md:overflow-visible [&::-webkit-scrollbar]:hidden">
                    {content.steps.map((step) => (
                      <div
                        key={step.num}
                        className="flex flex-col gap-6 w-30 shrink-0 md:w-auto md:flex-1 md:shrink md:min-w-0"
                      >
                        <img
                          src={step.img}
                          alt={step.label}
                          className="aspect-square w-full object-contain"
                        />
                        <div className="flex flex-col justify-between gap-6 flex-1">
                          <p className="text-xs leading-[1.1]">
                            <span className="text-white">{step.label} </span>
                            <span className="text-foreground-muted">
                              {step.desc}
                            </span>
                          </p>
                          <div className="border border-white/20 flex items-center justify-center rounded-full size-12.5 shrink-0">
                            <span className="text-sm text-white leading-[1.1]">
                              {step.num}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {content.equipment && (
                <div className="flex flex-col gap-8">
                  <p className="text-2xl uppercase leading-[1.1] text-white">
                    [Equipment]{" "}
                    <span className="text-foreground-muted normal-case">
                      (included in price)
                    </span>
                  </p>
                  <div className="flex flex-col gap-8 text-sm text-white">
                    {content.equipment.groups.map((group) => (
                      <div key={group.heading} className="flex flex-col gap-4">
                        <p className="text-xl uppercase leading-[1.1]">
                          {group.heading}
                        </p>
                        <ul className="flex flex-col gap-1 list-disc pl-5 leading-6">
                          {group.items.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                    {content.equipment.note && (
                      <p className="leading-6">{content.equipment.note}</p>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Buttons — always pinned to the bottom, never scroll away */}
            <div className="shrink-0 flex gap-4 px-6 py-4 border-t border-foreground-muted">
              {content.downloadGuide && (
                <button
                  type="button"
                  className="flex-1 flex items-center justify-center gap-4 py-4 px-5 text-sm md:text-[1rem] cursor-pointer transition-all duration-300 bg-accent border border-white/20 text-white hover:bg-[#0a3a7a]"
                >
                  <Image
                    src="/icons/download-guide.svg"
                    alt=""
                    width={32}
                    height={32}
                    className="w-8 h-8"
                  />
                  Download Guide
                </button>
              )}
              <Button
                variant="light"
                className="flex-1"
                onClick={() =>
                  setModal({
                    type: "book",
                    room: room ?? undefined,
                    from: "room-info",
                  })
                }
              >
                Book Session
              </Button>
            </div>
          </div>

          {/* Right: image slider (top on mobile, right on desktop) */}
          <div className="relative w-full aspect-375/240 md:aspect-auto md:w-[40%] md:h-full shrink-0 order-first md:order-last">
            <ImageFader
              key={room}
              images={content.modalImages}
              alt={content.title}
            />
          </div>
        </div>
      )}
    </BaseModal>
  );
};

export default RoomInfoModal;
