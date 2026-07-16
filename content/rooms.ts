import { Room } from "@/types/modal";

export type Tarif = { value: string; amount: string; duration: string };

export type Step = { img: string; label: string; desc: string; num: string };

export type RoomData = {
  title: string;
  // Image used in RoomInfoModal / BookModal / HeroSlider — full-bleed crop
  modalImage: string;
  // Image used in SpacesSection cards and BookModal's room preview column
  cardImage: string;
  // Long-form copy — RoomInfoModal, RoomSelectorSection hover panel
  modalDescription: string;
  // Short marketing blurb — SpacesSection card, BookModal "Select Space" card
  cardDescription: string;
  tarifs: Tarif[];
  amenities: string[];
  highlights: { title: string; description: string }[];
  steps: Step[];
  card: { num: string; tag: string; tags: string[] };
};

const selfIllustrations = [
  "/how-it-works/step-01.svg",
  "/how-it-works/step-02.svg",
  "/how-it-works/step-03.svg",
  "/how-it-works/step-04.svg",
  "/how-it-works/step-05.svg",
];

const sharedSteps: Step[] = [
  {
    img: selfIllustrations[0],
    label: "Book",
    desc: "your private slot online through our intuitive system.",
    num: "01",
  },
  {
    img: selfIllustrations[1],
    label: "Arrive",
    desc: "at the studio and enter your dedicated space.",
    num: "02",
  },
  {
    img: selfIllustrations[2],
    label: "Capture",
    desc: "your best angles using the wireless remote shutter.",
    num: "03",
  },
  {
    img: selfIllustrations[3],
    label: "Receive",
    desc: "your high-resolution digital gallery via a secure link after 24 hours.",
    num: "04",
  },
  {
    img: selfIllustrations[4],
    label: "Download",
    desc: "your photos within 14 weeks after the photo shoot.",
    num: "05",
  },
];

export const ROOMS: Record<Room, RoomData> = {
  self: {
    title: "Self Room",
    modalImage: "/spaces/modal-self.webp",
    cardImage: "/spaces/selfroom.webp",
    modalDescription:
      "A completely private space with just you, a large mirror, and a clicker in your hand.\n\nPremium camera and professional lighting are already perfectly tuned.",
    cardDescription:
      "A unique date idea, fun family photos, or simply time for yourself. Change outfits, act silly, and capture genuine emotions.",
    tarifs: [
      { value: "1h", amount: "499 AED", duration: "1 hour" },
      { value: "5h", amount: "1500 AED", duration: "5 hour" },
      { value: "10h", amount: "2800 AED", duration: "10 hour" },
    ],
    amenities: [
      "Gallery delivered within 24 hours",
      "Ceiling 3.9 m",
      "Pro-level detail: lighting and cameras",
      "Wireless clicker — full control, no assistance needed",
      "1 hour minimal rent time",
      "3 editing styles: Original / B&W / Film",
    ],
    highlights: [
      {
        title: "Absolute\nPrivacy",
        description: "Professional results in total solitude.",
      },
      {
        title: "Instant\nControl",
        description: "You are the photographer. You decide.",
      },
      {
        title: "Instant\nGallery",
        description: "Fast access to high-resolution shots.",
      },
      {
        title: "Mirror\nTech",
        description: "See your reflection, capture perfection.",
      },
    ],
    steps: sharedSteps,
    card: { num: "01", tag: "[Total Privacy]", tags: ["Solo", "Family", "Love-Story"] },
  },
  main: {
    title: "Main Room",
    modalImage: "/spaces/modal-main.webp",
    cardImage: "/spaces/mainroom.webp",
    modalDescription:
      "Bring your camera, your crew, your vision. Profoto and Aputure lighting, a motorized rail, and a cyclorama wall are already dialed in and ready the moment you walk in.",
    cardDescription:
      "Clean, stylish shots for your resume, corporate website, or personal brand.",
    tarifs: [
      { value: "1h", amount: "400 AED", duration: "1 hour" },
      { value: "5h", amount: "1750 AED", duration: "5 hour" },
      { value: "10h", amount: "3500 AED", duration: "10 hour" },
    ],
    amenities: [
      "60 sqm area",
      "Ceiling 3.9 m",
      "3 Profoto D3 strobe lights",
      "2 Aputure 300x (bi-colour) continuous lights",
      "1 hour minimal rent time",
      "Motorized ceiling rail — reposition lights in seconds",
    ],
    highlights: [
      {
        title: "Commercial\nScale",
        description: "Ample space for large-scale productions.",
      },
      {
        title: "Pro\nEquipment",
        description: "Top-tier lighting and technical gear.",
      },
      {
        title: "Creative\nFreedom",
        description: "Flexible setups for complex visions.",
      },
      {
        title: "Expert\nSupport",
        description: "Full assistance for seamless shooting.",
      },
    ],
    steps: sharedSteps,
    card: { num: "02", tag: "", tags: ["Business Portrait", "Comp Cards", "Brand Content"] },
  },
};
