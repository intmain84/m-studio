import { Room } from "@/types/modal";

export type HeroSlide = {
  title: string;
  text: string;
  image: string;
  progressColor: "light" | "dark";
  room?: Room;
};

// \n in title and text is rendered as a line break (requires whitespace-pre-line on the element)
export const HERO_SLIDES: HeroSlide[] = [
  {
    title: "1 studio\n2 spaces",
    text: "A completely private space with just you, a large mirror, and a clicker in your hand.\n\nPremium camera and professional lighting are already perfectly tuned.",
    image: "/hero-slides/1.jpg",
    progressColor: "light",
  },
  {
    title: "Self\nRoom",
    text: "A completely private space with just you, a large mirror, and a clicker in your hand.\n\nPremium camera and professional lighting are already perfectly tuned.",
    image: "/hero-slides/2.jpg",
    progressColor: "dark",
    room: "self",
  },
  {
    title: "main\nRoom",
    text: "A completely private space with just you, a large mirror, and a clicker in your hand.\n\nPremium camera and professional lighting are already perfectly tuned.",
    image: "/hero-slides/3.jpg",
    progressColor: "light",
    room: "main",
  },
];
