// \n in title and text is rendered as a line break (requires whitespace-pre-line on the element)
export type Slide = {
  title: string;
  text: string;
  image: string;
  progressColor: string;
};

export const slides: Slide[] = [
  {
    title: "1 studio\n2 spaces",
    text: "A completely private space with just you, a large mirror, and a clicker in your hand.\n\nPremium camera and professional lighting are already perfectly tuned.",
    image: "/hero-slides/1.jpg",
    progressColor: "#ffffff",
  },
  {
    title: "Self\nRoom",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec suscipit auctor dui, at convallis nisl.",
    image: "/hero-slides/2.jpg",
    progressColor: "#000000",
  },
  {
    title: "main\nRoom",
    text: "A completely private space with just you, a large mirror, and a clicker in your hand.\n\nPremium camera and professional lighting are already perfectly tuned.",
    image: "/hero-slides/3.jpg",
    progressColor: "#ffffff",
  },
];
