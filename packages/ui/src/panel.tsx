import type { PropsWithChildren } from "react";

export function Panel({ children }: PropsWithChildren) {
  return (
    <div className="rounded-xl border border-zinc-700/50 bg-zinc-900/70 p-4 shadow-lg shadow-zinc-950/30">
      {children}
    </div>
  );
}
