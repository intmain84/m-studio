"use client";

import { useEffect, useRef, useState } from "react";

export function useScrollVisibility() {
  const [isVisible, setIsVisible] = useState(true);
  const [hasScrolled, setHasScrolled] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;

      const shouldBeVisible = currentY < lastScrollY.current || currentY < 10;

      setIsVisible((prev) =>
        prev !== shouldBeVisible ? shouldBeVisible : prev,
      );
      setHasScrolled(currentY > 10);

      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return { isVisible, hasScrolled };
}
