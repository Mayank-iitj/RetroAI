import Link from "next/link";
import { BootOnboarding } from "@/components/boot-onboarding";
import { DosLoader } from "@/components/dos-loader";

export default function HomePage() {
  return (
    <main className="space-y-8">
      <BootOnboarding />
      <section className="crt rounded-2xl border border-cyan-400/30 bg-black/50 p-8">
        <p className="mb-2 font-display text-xs uppercase tracking-widest text-cyan-300">Boot Sequence</p>
        <h1 className="mb-3 text-4xl font-bold text-white">Retro AI Companion</h1>
        <p className="max-w-2xl text-cyan-100/90">
          A 1989 digital pet reimagined as a shared, persistent AI lifeform with multiplayer care,
          memory, and explainable personality evolution.
        </p>
        <div className="mt-6 h-2 w-full overflow-hidden rounded bg-zinc-800">
          <div className="boot-bar h-full bg-gradient-to-r from-cyan-300 to-pink-400" />
        </div>
        <div className="mt-4 max-w-xs">
          <DosLoader progress={68} />
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/app/dashboard" className="rounded bg-cyan-300 px-4 py-2 font-semibold text-black">
            Launch Console
          </Link>
          <Link href="/docs" className="rounded border border-cyan-300/60 px-4 py-2 text-cyan-100">
            View Docs
          </Link>
        </div>
      </section>
    </main>
  );
}
