"use client";
import Image from "next/image";
import { Dialog } from "radix-ui";

import BaseModal from "./BaseModal";
import Button from "@/components/Button";
import { useModal } from "@/context/ModalContext";

type Price = { amount: string; label: string };

type RoomContent = {
  title: string;
  prices: Price[];
  features: string[];
  description: string;
  image: string;
};

const CONTENT: Record<"self" | "main", RoomContent> = {
  self: {
    title: "Self Room",
    prices: [
      { amount: "315 AED", label: "1 hour" },
      { amount: "1500 AED", label: "5 hour" },
      { amount: "2800 AED", label: "10 hour" },
    ],
    features: [
      "60 sqm area",
      "Ceiling 3.9 m",
      "3 Profoto D3 strobe lights",
      "2 Aputure 300x (bi-colour) continuous lights",
      "1 hour minimal rent time",
      "1 hour of makeup area is complimentary",
    ],
    description:
      "A completely private space with just you, a large mirror, and a clicker in your hand.\n\nPremium camera and professional lighting are already perfectly tuned.",
    image: "/spaces/modal-self.webp",
  },
  main: {
    title: "Main Room",
    prices: [
      { amount: "315 AED", label: "1 hour" },
      { amount: "1500 AED", label: "5 hour" },
      { amount: "2800 AED", label: "10 hour" },
    ],
    features: [
      "60 sqm area",
      "Ceiling 3.9 m",
      "3 Profoto D3 strobe lights",
      "2 Aputure 300x (bi-colour) continuous lights",
      "1 hour minimal rent time",
      "1 hour of makeup area is complimentary",
    ],
    description:
      "A versatile professional studio designed for commercial shoots and editorial projects.\n\nHigh-ceiling space equipped with pro-grade gear to bring your most complex visions to life.",
    image: "/spaces/modal-main.webp",
  },
};

const RoomInfoModal = () => {
  const { modal, setModal } = useModal();
  const open = modal?.type === "room-info";
  const room = modal?.type === "room-info" ? modal.room : undefined;
  const content = room ? CONTENT[room] : undefined;

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
                {content.prices.map((p) => (
                  <span key={p.label}>
                    {p.amount}{" "}
                    <span className="text-foreground-muted">({p.label})</span>
                  </span>
                ))}
              </div>
            </div>

            <ul className="flex flex-col gap-3">
              {content.features.map((f) => (
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
              {content.description}
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
              src={content.image}
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
