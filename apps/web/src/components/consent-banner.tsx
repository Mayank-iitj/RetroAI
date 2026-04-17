"use client";

import { useState } from "react";

export function ConsentBanner() {
  const [visible, setVisible] = useState(true);

  const saveConsent = (mode: "all" | "essential") => {
    const payload = mode === "all"
      ? { essential: true, analytics: true, personalization: true }
      : { essential: true, analytics: false, personalization: false };

    localStorage.setItem("retro-consent", JSON.stringify(payload));
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 rounded-xl border border-cyan-300/40 bg-zinc-950/90 p-4 text-sm text-cyan-100">
      <p className="mb-3">We use analytics and personalization cookies. You can export or delete your data anytime.</p>
      <div className="flex gap-2">
        <button type="button" className="rounded bg-cyan-300 px-3 py-1 font-semibold text-black" onClick={() => saveConsent("all")}>
          Accept
        </button>
        <button type="button" className="rounded border border-cyan-300/60 px-3 py-1" onClick={() => saveConsent("essential")}>
          Essential Only
        </button>
      </div>
    </div>
  );
}
