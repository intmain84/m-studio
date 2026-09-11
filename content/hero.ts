import { Room } from "@/types/modal";

export type HeroSlide = {
  title: string;
  text: string;
  image: string;
  progressColor: "light" | "dark";
  room?: Room;
  buttonText?: string;
  titleSize?: "sm" | "lg";
  titleAlign?: "start" | "end";
  // "split": title alone on the left, text+button+dots centered as a column on the right
  layout?: "split";
};

// \n in title and text is rendered as a line break (requires whitespace-pre-line on the element)
export const HERO_SLIDES: HeroSlide[] = [
  {
    title: "THE\nSPACE\nBETWEEN\nYOUR\nIDEA AND\nGREAT\nCONTENT.",
    text: "Create more. Think less.",
    image: "/hero-slides/1.jpg",
    progressColor: "light",
    buttonText: "Select Spaces",
    titleSize: "sm",
    titleAlign: "end",
    layout: "split",
  },
  {
    title: "Self\nRoom",
    text: "A unique date idea, fun family photos, or simply time for yourself.",
    image: "/hero-slides/2.jpg",
    progressColor: "dark",
    room: "self",
  },
  {
    title: "main\nRoom",
    text: "Bring your own camera and crew — from solo content batches to full productions. We give you the light and the space to make it happen.",
    image: "/hero-slides/3.jpg",
    progressColor: "light",
    room: "main",
  },
];
