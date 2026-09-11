import { Room } from "@/types/modal";

export type Tarif = {
  value: string;
  amount: string;
  duration: string;
  // Per-hour rate shown in gray next to the total, e.g. "350/hr" — omitted for the base tier
  perHour?: string;
};

export type Step = { img: string; label: string; desc: string; num: string };

export type Preset = { label: string; image: string };

export type EquipmentGroup = { heading: string; items: string[] };

export type RoomData = {
  title: string;
  // Images used in RoomInfoModal's right-hand column — cross-fades between them
  modalImages: string[];
  // Image used in SpacesSection cards and BookModal's room preview column
  cardImage: string;
  // Image used on BookModal's "Select Space" card
  selectImage: string;
  // Long-form copy — RoomInfoModal, RoomSelectorSection hover panel
  modalDescription: string;
  // Short marketing blurb — SpacesSection card only
  cardDescription: string;
  // Copy shown on BookModal's "Select Space" card
  selectDescription: string;
  tarifs: Tarif[];
  amenities: string[];
  highlights: { title: string; description: string }[];
  card: { num: string; tag: string; tags: string[] };
  // Everything below is optional — each room's RoomInfoModal layout is a bit
  // different, so a room only renders the sections it has data for.
  // Shown under the title: a room has either a minimum-duration line or a
  // price breakdown (falls back to `tarifs`) — never both.
  minDuration?: string; // e.g. "50 minutes"
  steps?: Step[];
  presets?: Preset[];
  equipment?: { groups: EquipmentGroup[]; note?: string };
  downloadGuide?: boolean;
};

const selfIllustrations = [
  "/how-it-works-v2/01-reserve.png",
  "/how-it-works-v2/02-arrive.png",
  "/how-it-works-v2/03-shoot.png",
  "/how-it-works-v2/04-receive.svg",
  "/how-it-works-v2/05-download.png",
];

const sharedSteps: Step[] = [
  {
    img: selfIllustrations[0],
    label: "Reserve",
    desc: "your slot online in a few clicks",
    num: "01",
  },
  {
    img: selfIllustrations[1],
    label: "Arrive",
    desc: "at the studio and step into your room",
    num: "02",
  },
  {
    img: selfIllustrations[2],
    label: "Shoot",
    desc: "your photos — camera & lighting are already set up. Just use the remote clicker.",
    num: "03",
  },
  {
    img: selfIllustrations[3],
    label: "Receive",
    desc: "your high-resolution photos via a secure link during 24 hours",
    num: "04",
  },
  {
    img: selfIllustrations[4],
    label: "Download",
    desc: "your photos within 14 days of delivery — after that, the link expires.",
    num: "05",
  },
];

export const ROOMS: Record<Room, RoomData> = {
  self: {
    title: "Self Room",
    modalImages: ["/spaces/modal-self.webp", "/spaces/selfroom.webp"],
    cardImage: "/spaces/selfroom.webp",
    selectImage: "/spaces/spaces_self.png",
    modalDescription:
      "Close the door, pick up the clicker, and shoot at your own pace. Change outfits, try different angles, take a break — no one's watching and no one's rushing you.\n\nPremium camera and professional lighting are already perfectly tuned.",
    cardDescription:
      "A unique date idea, fun family photos, or simply time for yourself...",
    selectDescription:
      "A unique date idea, fun family photos, or simply time for yourself. Change outfits, act silly, and capture genuine emotions.",
    tarifs: [{ value: "50m", amount: "350 AED", duration: "50 minutes" }],
    amenities: [
      "~17 sqm space, 3.9m ceiling height",
      "Three-sided cyclorama, 3x4 m",
      "Gallery delivered within 24 hours",
      "Sony A7R V — 61MP professional camera",
      "Godox studio lighting, pre-tuned and ready",
      "Wireless clicker — full control, no assistance needed",
      "1 hour minimum rent time",
      "3 editing options: Original / B&W / Film & Grain (choose in advance)",
    ],
    minDuration: "50 minutes",
    presets: [
      { label: "Original", image: "/presets/original.png" },
      { label: "B&W", image: "/presets/bw.png" },
      { label: "Film & Grain", image: "/presets/film-grain.png" },
    ],
    equipment: {
      groups: [
        {
          heading: "Camera",
          items: ["Sony A7R V — 61MP full-frame mirrorless camera"],
        },
        {
          heading: "Flash & Lighting",
          items: [
            "Godox QT600IIIM Flash Head",
            "Godox XPro-S TTL Wireless Trigger (Sony-compatible)",
            'Godox Octa Softbox with Bowens speed ring (55")',
          ],
        },
        {
          heading: "Mounting & Support",
          items: [
            "Manfrotto 098B Wall Mounting Boom Arm Control",
            "Wireless remote clicker — full control, no assistance needed",
          ],
        },
      ],
      note: "Camera, lighting, and mirror are already set up and ready to shoot.",
    },
    downloadGuide: true,
    steps: sharedSteps,
    highlights: [
      {
        title: "Absolute\nPrivacy",
        description: "A completely private space, just for you",
      },
      {
        title: "Instant\nControl",
        description: "You are the photographer. You decide.",
      },
      {
        title: "Mirror\nTech",
        description: "See your reflection, capture perfection",
      },
      {
        title: "Ready In\n24 Hours",
        description: "High-resolution photos, ready to download",
      },
    ],
    card: {
      num: "01",
      tag: "[Total Privacy]",
      tags: ["Solo", "Family", "Love-Story", "Friends", "Team Shoots"],
    },
  },
  main: {
    title: "Main Room",
    modalImages: ["/spaces/modal-main.webp", "/spaces/mainroom.webp"],
    cardImage: "/spaces/mainroom.webp",
    selectImage: "/spaces/spaces_main.png",
    modalDescription:
      "A full production space, built for your own vision. Bring your camera, your team, your style — the room adapts to how you want to shoot.",
    cardDescription:
      "Bring your own camera and crew — from solo content batches to full productions",
    selectDescription:
      "Bring your own camera and crew — from solo content batches to full productions. Profoto lighting, high ceilings, and the space to make it happen.",
    tarifs: [
      { value: "1h", amount: "400 AED", duration: "1 hour" },
      {
        value: "2h",
        amount: "700 AED",
        duration: "2 hour",
        perHour: "350/hr",
      },
      {
        value: "4h",
        amount: "1,200 AED",
        duration: "4 hour",
        perHour: "300/hr",
      },
      {
        value: "8h",
        amount: "2,240 AED",
        duration: "8 hour",
        perHour: "280/hr",
      },
    ],
    amenities: [
      "~20 sqm space + 15 sqm reception area, 3.9m ceiling height",
      "Three-sided cyclorama, 4x4 m",
      "3 Profoto D30 500Ws strobes with a full modifier set",
      "Amaran Ray 660c RGB — full-color LED lighting",
      "Manfrotto Sky Track — ceiling-mounted rail system",
      "1 hour minimum rent time",
      "Camera and photographer are not included — bring your own camera and crew",
    ],
    equipment: {
      groups: [
        {
          heading: "Strobe Lighting (Profoto)",
          items: [
            "3x Profoto D30 500Ws Monolights",
            "Profoto Connect Pro wireless transmitter",
            'Profoto Deep Medium Umbrella (41", translucent)',
            "Profoto Barndoors",
            "2x Profoto Zoom Reflectors",
            "Profoto Octa Softbox (4', Silver Interior)",
            "Profoto Octa Softbox (4')",
            "2x Profoto Strip Softgrid (1 x 4')",
            "Profoto Grid Kit for Zoom Reflector 2",
            "Grid kit for zoom reflectors",
          ],
        },
        {
          heading: "Continuous LED Lighting (Amaran / Aputure)",
          items: [
            "3x Amaran Ray 660c RGB LED Monolights",
            "Amaran Octa Dome (4')",
            "Aputure Lantern (3')",
            'Amaran Light Box strip softbox (12x48")',
            "Amaran Spotlight SE with 36° lens kit and iris attachment",
            "Aputure barndoors",
            'Amaran Light Dome (24"/60cm)',
            "Aputure Fresnel 2X attachment",
            "Godox barndoor kit",
            "2x Aputure B7c accent lights",
            "Aputure Storm 80c 3-light kit",
          ],
        },
        {
          heading: "Grip & Rigging",
          items: [
            "Manfrotto Sky Track — ceiling-mounted rail system",
            "2x Avenger C-Stands with grip arms",
            "2x Kupo Baby Roller Stand (8.8')",
            "Kupo Backlite Base Stand",
            "Kupo Mini Click Stand",
          ],
        },
      ],
    },
    highlights: [
      {
        title: "Pro\nEquipment",
        description: "Profoto D30 strobes, full modifier set",
      },
      {
        title: "Manfrotto\nSystem",
        description: "Ceiling rail — move lights with precision",
      },
      {
        title: "Cyclorama\nWall",
        description: "Three-sided, seamless from every angle",
      },
      {
        title: "Bring\nYour Own",
        description: "Your camera, your crew",
      },
    ],
    card: {
      num: "02",
      tag: "",
      tags: ["Comp Cards", "Production", "Brand", "Portfolio Shoot"],
    },
  },
};
