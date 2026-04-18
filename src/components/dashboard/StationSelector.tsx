import { Check, ChevronDown, Radio } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { STATIONS, useStation } from "./StationContext";

export function StationSelector() {
  const { station, setStation } = useStation();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-8 gap-2 border-border bg-background text-xs font-medium"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-pulse-soft rounded-full bg-success opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
          </span>
          <span className="hidden sm:inline text-muted-foreground">Station:</span>
          <span className="text-foreground">{station.name}</span>
          <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuLabel className="text-[11px] uppercase tracking-wider text-muted-foreground">
          Monitoring Stations
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {STATIONS.map((s) => {
          const active = s.id === station.id;
          return (
            <DropdownMenuItem
              key={s.id}
              onSelect={() => setStation(s.id)}
              className="flex items-center gap-2"
            >
              <Radio className="h-3.5 w-3.5 text-muted-foreground" />
              <div className="flex-1">
                <p className="text-sm">{s.name}</p>
                <p className="text-mono-num text-[10px] text-muted-foreground">Code · {s.short}</p>
              </div>
              {active && <Check className="h-3.5 w-3.5 text-accent" />}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
