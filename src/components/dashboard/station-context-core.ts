import { createContext } from "react";

export type StationId = "mz" | "caesarea" | "nahsholim" | "gada" | "kmaharal";
export type Station = { id: StationId; name: string; short: string; factor: number };

export const STATIONS: Station[] = [
  { id: "mz", name: "Maayan Zvi (Primary)", short: "MZ", factor: 1.0 },
  { id: "caesarea", name: "Caesarea", short: "CSR", factor: 0.94 },
  { id: "nahsholim", name: "Nahsholim", short: "NHS", factor: 1.08 },
  { id: "gada", name: "Givat Ada", short: "G.ADA", factor: 0.88 },
  { id: "kmaharal", name: "Kerem Maharal", short: "K.MAHARAL", factor: 0.92 },
];

export type StationCtx = {
  station: Station;
  setStation: (id: StationId) => void;
};

export const StationContext = createContext<StationCtx | null>(null);
