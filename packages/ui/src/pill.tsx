import type { PropsWithChildren } from "react";

export function Pill({ children }: PropsWithChildren) {
  return (
    <span className="inline-flex rounded-full border border-cyan-400/50 bg-cyan-500/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-cyan-100">
      {children}
    </span>
  );
}
