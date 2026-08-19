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
    desc: "your high-resolution digital gallery via a secure link.",
    num: "04",
  },
  {
    img: selfIllustrations[4],
    label: "Download",
    desc: "your photos within 14 days after the photo shoot.",
    num: "05",
  },
];

export const ROOMS: Record<Room, RoomData> = {
  self: {
    title: "Self Room",
    modalImage: "/spaces/modal-self.webp",
    cardImage: "/spaces/selfroom.webp",
    modalDescription:
      "Close the door, pick up the clicker, and shoot at your own pace. Change outfits, try different angles, take a break — no one's watching and no one's rushing you.\n\nPremium camera and professional lighting are already perfectly tuned.",
    cardDescription:
      "A unique date idea, fun family photos, or simply time for yourself. Change outfits, act silly, and capture genuine emotions.",
    tarifs: [
      { value: "1h", amount: "499 AED", duration: "1 hour" },
      { value: "2h", amount: "899 AED", duration: "2 hour" },
      { value: "4h", amount: "1.599 AED", duration: "4 hour" },
    ],
    amenities: [
      "Gallery delivered within 24 hours",
      "Ceiling 3.9 m",
      "Pro-level detail: lighting and cameras",
      "Wireless clicker — full control, no assistance needed",
      "1 hour minimal rent time",
    ],
    highlights: [
      {
        title: "Absolute\nPrivacy",
        description:
          "No staff. No strangers. No one watching. A completely private space, just for you.",
      },
      {
        title: "Ready\nTo Shoot",
        description:
          "Camera set up. Lighting dialled in. Everything's ready — just pick up the clicker.",
      },
      {
        title: "See It In\nReal Time",
        description: "Full-wall mirror — frame the shot before you take it.",
      },
      {
        title: "Ready By\nEnd Of Day",
        description:
          "Your photos are AI-processed, edited, and delivered to you the same day",
      },
    ],
    steps: sharedSteps,
    card: { num: "01", tag: "[Total Privacy]", tags: ["Solo", "Couples", "Family", "Love-Story"] },
  },
  main: {
    title: "Main Room",
    modalImage: "/spaces/modal-main.webp",
    cardImage: "/spaces/mainroom.webp",
    modalDescription:
      "Bring your camera, your crew, your vision. Profoto and Aputure lighting, a motorized rail, and a cyclorama wall are already dialed in and ready the moment you walk in.",
    cardDescription:
      "Bring your camera and crew. From solo content days to full commercial productions",
    tarifs: [
      { value: "1h", amount: "400 AED", duration: "1 hour" },
      { value: "4h", amount: "1499 AED", duration: "4 hour" },
      { value: "8h", amount: "2799 AED", duration: "8 hour" },
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
        title: "Production\nSpace",
        description: "High ceiling, cyclorama, room for your entire crew.",
      },
      {
        title: "Profoto\nLighting",
        description: "Profoto strobes and a full modifier set",
      },
      {
        title: "Ceiling Rail\nSystem",
        description:
          "Manfrotto Sky Track — reposition lights from above without touching a stand.",
      },
      {
        title: "Total\nFlexibility",
        description:
          "No fixed layout. Move the lights, change the setup, run it your way.",
      },
    ],
    steps: sharedSteps,
    card: { num: "02", tag: "", tags: ["Brand", "Campaign Editorial", "Team Production"] },
  },
};
