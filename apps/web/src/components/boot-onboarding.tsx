"use client";

import { useEffect, useState } from "react";

export function BootOnboarding() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timers = [400, 900, 1400].map((delay, idx) =>
      setTimeout(() => setStep(idx + 1), delay)
    );

    return () => timers.forEach(clearTimeout);
  }, []);

  const lines = [
    "[OK] MEMORY MAP LOADED",
    "[OK] EMOTION KERNEL STARTED",
    "[OK] NETWORK PRESENCE ONLINE"
  ];

  return (
    <div className="rounded-xl border border-cyan-300/40 bg-black/60 p-4 font-display text-[10px] tracking-wide text-cyan-200">
      <p className="mb-3">BOOTING RETRO AI BIOS...</p>
      {lines.slice(0, step).map((line) => (
        <p key={line} className="animate-boot">
          {line}
        </p>
      ))}
    </div>
  );
}
