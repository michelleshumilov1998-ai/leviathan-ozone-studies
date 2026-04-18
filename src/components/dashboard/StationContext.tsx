import { createContext, useContext, useMemo, useState, ReactNode } from "react";

export type StationId = "mz" | "hadera" | "magan";
export type Station = { id: StationId; name: string; short: string; factor: number };

export const STATIONS: Station[] = [
  { id: "mz", name: "Ma'ayan Zvi (Primary)", short: "MZ", factor: 1.0 },
  { id: "hadera", name: "Hadera North", short: "HD", factor: 0.86 },
  { id: "magan", name: "Ma'agan Michael", short: "MM", factor: 1.12 },
];

type Ctx = {
  station: Station;
  setStation: (id: StationId) => void;
};

const StationContext = createContext<Ctx | null>(null);

export function StationProvider({ children }: { children: ReactNode }) {
  const [stationId, setStationId] = useState<StationId>("mz");
  const value = useMemo<Ctx>(
    () => ({
      station: STATIONS.find((s) => s.id === stationId)!,
      setStation: setStationId,
    }),
    [stationId],
  );
  return <StationContext.Provider value={value}>{children}</StationContext.Provider>;
}

export function useStation() {
  const ctx = useContext(StationContext);
  if (!ctx) throw new Error("useStation must be used within StationProvider");
  return ctx;
}
