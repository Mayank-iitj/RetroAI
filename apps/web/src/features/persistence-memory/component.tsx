"use client";

import { useMemo, useState } from "react";
import { createSnapshot, enqueueSync, exportStateToJson, replaySnapshots } from "./service";
import type { Snapshot, SyncQueueItem } from "./types";
import { postJson } from "@/lib/client-api";

export function PersistencePanel() {
  const [snapshots, setSnapshots] = useState<Snapshot[]>([]);
  const [queue, setQueue] = useState<SyncQueueItem[]>([]);
  const [status, setStatus] = useState("Idle");
  const timeline = useMemo(() => replaySnapshots(snapshots), [snapshots]);

  return (
    <section className="space-y-4 rounded-2xl border border-cyan-300/30 bg-zinc-900/60 p-6">
      <h2 className="text-xl font-bold">Persistence and Memory</h2>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          className="rounded bg-cyan-300 px-3 py-2 font-semibold text-black"
          onClick={async () => {
            const snapshot = createSnapshot(snapshots, { mood: "happy", tick: Date.now() });
            setSnapshots((prev) => [snapshot, ...prev]);
            setQueue((prev) =>
              enqueueSync(prev, {
                id: crypto.randomUUID(),
                op: "save",
                payload: { snapshotId: snapshot.id },
                timestamp: Date.now()
              })
            );
            try {
              await postJson("/api/snapshots", {
                companionId: "11111111-1111-1111-1111-111111111111",
                label: `Snapshot v${snapshot.version}`
              });
              setStatus("Snapshot saved to cloud.");
            } catch {
              setStatus("Cloud sync pending. Local snapshot retained.");
            }
          }}
        >
          Save Snapshot
        </button>
      </div>
      <p className="text-xs text-cyan-200/90">{status}</p>

      <div className="rounded border border-zinc-700/50 bg-black/40 p-3">
        <p className="mb-2 font-semibold">Time Travel Timeline</p>
        {timeline.map((snap) => (
          <p key={snap.id} className="text-sm">v{snap.version} - {snap.createdAt}</p>
        ))}
      </div>

      {snapshots[0] && (
        <div className="rounded border border-zinc-700/50 bg-black/40 p-3">
          <p className="mb-2 font-semibold">Export JSON / QR Payload</p>
          <pre className="max-h-28 overflow-auto text-xs text-cyan-100">{exportStateToJson(snapshots[0])}</pre>
        </div>
      )}

      <div className="rounded border border-zinc-700/50 bg-black/40 p-3">
        <p className="mb-2 font-semibold">Offline Sync Queue</p>
        <p className="text-sm">queued operations: {queue.length}</p>
      </div>
    </section>
  );
}
