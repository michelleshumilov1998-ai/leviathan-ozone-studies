import { createContext } from "react";

export type StationId = "mz" | "hadera" | "magan";
export type Station = { id: StationId; name: string; short: string; factor: number };

export const STATIONS: Station[] = [
  { id: "mz", name: "Ma'ayan Zvi (Primary)", short: "MZ", factor: 1.0 },
  { id: "hadera", name: "Hadera North", short: "HD", factor: 0.86 },
  { id: "magan", name: "Ma'agan Michael", short: "MM", factor: 1.12 },
];

export type StationCtx = {
  station: Station;
  setStation: (id: StationId) => void;
};

export const StationContext = createContext<StationCtx | null>(null);
