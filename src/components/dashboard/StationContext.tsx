import { createContext, useContext, useMemo, useState, ReactNode } from "react";
import { STATIONS, StationId } from "./station-context-core";

export { STATIONS } from "./station-context-core";
export type { Station, StationId } from "./station-context-core";

type StationCtx = {
  station: (typeof STATIONS)[number];
  setStation: (id: StationId) => void;
};

const StationContext = createContext<StationCtx | null>(null);

export function StationProvider({ children }: { children: ReactNode }) {
  const [stationId, setStationId] = useState<StationId>("mz");
  const value = useMemo<StationCtx>(
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
