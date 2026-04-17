"use client";

import { useEffect } from "react";

const sequence = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a"
];

export function useKonami(onUnlock: () => void) {
  useEffect(() => {
    let idx = 0;

    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === sequence[idx].toLowerCase()) {
        idx += 1;
        if (idx === sequence.length) {
          onUnlock();
          idx = 0;
        }
      } else {
        idx = 0;
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onUnlock]);
}
