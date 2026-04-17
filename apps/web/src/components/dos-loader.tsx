"use client";

interface DosLoaderProps {
  progress: number;
}

export function DosLoader({ progress }: DosLoaderProps) {
  const safe = Math.max(0, Math.min(100, progress));

  return (
    <div className="rounded border border-cyan-400/50 bg-zinc-900/80 p-3 font-display text-[10px] text-cyan-200">
      <p className="mb-1">LOADING MODULE...</p>
      <div className="h-4 w-full border border-cyan-400/40 bg-black">
        <div className="h-full bg-cyan-300" style={{ width: `${safe}%` }} />
      </div>
      <p className="mt-1">{safe}% COMPLETE</p>
    </div>
  );
}
