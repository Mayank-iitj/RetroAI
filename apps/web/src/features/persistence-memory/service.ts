import type { Snapshot, SyncQueueItem } from "./types";

export function createSnapshot(existing: Snapshot[], state: Record<string, unknown>): Snapshot {
  const version = existing.length ? existing[0].version + 1 : 1;
  return {
    id: crypto.randomUUID(),
    version,
    createdAt: new Date().toISOString(),
    state
  };
}

export function replaySnapshots(snapshots: Snapshot[]): Snapshot[] {
  return [...snapshots].sort((a, b) => a.version - b.version);
}

export function enqueueSync(queue: SyncQueueItem[], item: SyncQueueItem): SyncQueueItem[] {
  return [...queue, item].sort((a, b) => a.timestamp - b.timestamp);
}

export function exportStateToJson(snapshot: Snapshot): string {
  return JSON.stringify(snapshot);
}
