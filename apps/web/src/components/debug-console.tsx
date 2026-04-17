"use client";

interface DebugConsoleProps {
  lines: string[];
}

export function DebugConsole({ lines }: DebugConsoleProps) {
  return (
    <section className="crt rounded-xl border border-amber-300/40 bg-black/70 p-4 font-mono text-xs text-amber-200">
      <p className="mb-2 text-amber-300">RETRO DEBUG CONSOLE</p>
      <div className="max-h-48 space-y-1 overflow-auto">
        {lines.map((line, idx) => (
          <p key={idx}>{line}</p>
        ))}
      </div>
    </section>
  );
}
