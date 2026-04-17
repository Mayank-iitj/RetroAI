export interface HeatmapCell {
  hour: number;
  interactions: number;
}

export interface WeeklyInsight {
  summary: string;
  anomalies: string[];
  topActions: { action: string; count: number }[];
}
