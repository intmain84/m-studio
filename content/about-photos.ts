export type AboutPhoto = {
  src: string;
  alt: string;
};

// Files in public/about are prefixed by area: r- (reception), s- (Self Room), m- (Main Room).
// Gallery order: all r-, then s-, then m-, each sorted by number.
const GROUPS = [
  { prefix: "r", count: 6 },
  { prefix: "s", count: 4 },
  { prefix: "m", count: 5 },
];

export const ABOUT_PHOTOS: AboutPhoto[] = GROUPS.flatMap(({ prefix, count }) =>
  Array.from({ length: count }, (_, i) => ({
    src: `/about/${prefix}-${i + 1}.avif`,
    alt: `The M Studio photo ${prefix}-${i + 1}`,
  })),
);
