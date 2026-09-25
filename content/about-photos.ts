export type AboutPhoto = {
  src: string;
  alt: string;
};

export const ABOUT_PHOTOS: AboutPhoto[] = Array.from({ length: 9 }, (_, i) => ({
  src: `/about/a-${i + 1}.avif`,
  alt: `The M Studio photo ${i + 1}`,
}));
