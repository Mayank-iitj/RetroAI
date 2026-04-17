export interface Snapshot {
  id: string;
  version: number;
  createdAt: string;
  state: Record<string, unknown>;
}

export interface SyncQueueItem {
  id: string;
  op: "save" | "restore" | "event";
  payload: Record<string, unknown>;
  timestamp: number;
}
