export type Preset = { value: string; label: string };

// Fallback used while the backend request is in flight or if it fails
export const DEFAULT_PRESETS: Preset[] = [
  { value: "n1", label: "Original" },
  { value: "bw1", label: "Black & White" },
  { value: "film1", label: "Film Grain" },
];
