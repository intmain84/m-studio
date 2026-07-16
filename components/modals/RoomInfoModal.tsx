"use client";
import Image from "next/image";
import { Dialog } from "radix-ui";

import BaseModal from "./BaseModal";
import Button from "@/components/ui/Button";
import { useModal } from "@/context/ModalContext";
import { ROOMS } from "@/content/rooms";

const RoomInfoModal = () => {
  const { modal, setModal } = useModal();
  const open = modal?.type === "room-info";
  const room = modal?.type === "room-info" ? modal.room : undefined;
  const content = room ? ROOMS[room] : undefined;

  return (
    <BaseModal
      open={open}
      className="md:w-[90vw] md:max-w-312 md:overflow-hidden"
    >
      {content && (
        <div className="flex flex-col md:flex-row">
          {/* Left: content */}
          <div className="flex-1 flex flex-col gap-10 p-6">
            <Dialog.Title className="sr-only">{content.title}</Dialog.Title>

            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap gap-4 gap-y-3 text-xs md:text-sm">
                {content.tarifs.map((t) => (
                  <span key={t.value}>
                    {t.amount}{" "}
                    <span className="text-foreground-muted">
                      ({t.duration})
                    </span>
                  </span>
                ))}
              </div>
            </div>

            <ul className="flex flex-col gap-3">
              {content.amenities.map((f) => (
                <li
                  key={f}
                  className="flex gap-2 items-center text-xs md:text-sm"
                >
                  <span className="size-1.5 rounded-full bg-white shrink-0" />
                  {f}
                </li>
              ))}
            </ul>

            <p className="text-foreground-muted text-xs md:text-sm leading-normal whitespace-pre-line">
              {content.modalDescription}
            </p>

            <Button
              variant="light"
              className="w-full"
              onClick={() =>
                setModal({ type: "book", room: room ?? undefined })
              }
            >
              Book Session
            </Button>
          </div>

          {/* Right: image (top on mobile, right on desktop) */}
          <div className="relative w-full aspect-375/240 md:aspect-auto md:w-[40%] md:h-auto shrink-0 order-first md:order-last">
            <Image
              src={content.modalImage}
              alt={content.title}
              fill
              className="object-cover"
            />
            <p className="absolute inset-0 flex items-center justify-center text-2xl md:text-[2.5rem] uppercase leading-[1.1] text-white text-center pointer-events-none">
              {content.title}
            </p>
          </div>
        </div>
      )}
    </BaseModal>
  );
};

export default RoomInfoModal;
