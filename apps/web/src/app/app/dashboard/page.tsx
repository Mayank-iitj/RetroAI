import Link from "next/link";

const routes = [
  ["Nostalgia Core", "/app/nostalgia"],
  ["AI Intelligence", "/app/intelligence"],
  ["Realtime Social", "/app/social"],
  ["Persistence", "/app/persistence"],
  ["Analytics", "/app/analytics"],
  ["Monetization", "/app/monetization"]
] as const;

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-display text-lg uppercase tracking-widest text-cyan-300">Control Hub</h1>
      <div className="grid gap-4 md:grid-cols-2">
        {routes.map(([label, href]) => (
          <Link key={href} href={href} className="rounded-xl border border-cyan-500/30 bg-zinc-900/60 p-4 hover:border-cyan-300">
            <p className="text-lg font-semibold">{label}</p>
            <p className="text-sm text-cyan-100/80">Open module and interact with live data.</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
