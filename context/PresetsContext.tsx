"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { DEFAULT_PRESETS, Preset } from "@/content/presets";

type PresetsContextType = {
  presets: Preset[];
};

const PresetsContext = createContext<PresetsContextType>({
  presets: DEFAULT_PRESETS,
});

export function PresetsProvider({ children }: { children: React.ReactNode }) {
  const [presets, setPresets] = useState<Preset[]>(DEFAULT_PRESETS);

  useEffect(() => {
    fetch("https://hooks.backend.ae/webhook/api/the-m/presets")
      .then((r) => r.json())
      .then((data: Preset[]) => {
        if (Array.isArray(data) && data.length) setPresets(data);
      })
      .catch(() => {});
  }, []);

  return (
    <PresetsContext.Provider value={{ presets }}>
      {children}
    </PresetsContext.Provider>
  );
}

export function usePresets() {
  return useContext(PresetsContext);
}
