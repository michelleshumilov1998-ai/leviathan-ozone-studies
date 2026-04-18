import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const data = [
  { sector: "N", baseline: 18, observed: 22 },
  { sector: "NE", baseline: 14, observed: 17 },
  { sector: "E", baseline: 12, observed: 13 },
  { sector: "SE", baseline: 16, observed: 19 },
  { sector: "S", baseline: 22, observed: 26 },
  { sector: "SW", baseline: 28, observed: 35 },
  { sector: "W", baseline: 31, observed: 46 },
  { sector: "NW", baseline: 25, observed: 34 },
];

export function WindRoseChart() {
  return (
    <Card className="border-border bg-gradient-card shadow-elev-sm">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="font-display text-base">
            Spatial Sector Analysis: O₃ Transport
          </CardTitle>
          <CardDescription className="mt-1 text-xs">
            Mean O₃ (ppb) per 45° wind sector — baseline vs. observed
          </CardDescription>
        </div>
        <Badge variant="secondary" className="border border-border text-[10px] uppercase tracking-wider">
          Wind Rose
        </Badge>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={data} outerRadius="78%">
              <PolarGrid stroke="hsl(var(--border))" />
              <PolarAngleAxis
                dataKey="sector"
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11, fontWeight: 600 }}
              />
              <PolarRadiusAxis
                angle={90}
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }}
                stroke="hsl(var(--border))"
              />
              <Radar
                name="Baseline"
                dataKey="baseline"
                stroke="hsl(var(--chart-4))"
                fill="hsl(var(--chart-4))"
                fillOpacity={0.18}
                strokeWidth={1.5}
              />
              <Radar
                name="Observed"
                dataKey="observed"
                stroke="hsl(var(--chart-2))"
                fill="hsl(var(--chart-2))"
                fillOpacity={0.32}
                strokeWidth={2}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--popover))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  fontSize: "12px",
                  boxShadow: "var(--shadow-md)",
                }}
                labelStyle={{ color: "hsl(var(--foreground))", fontWeight: 600 }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-3 flex items-center gap-4 border-t border-border pt-3 text-xs">
          <LegendDot color="hsl(var(--chart-4))" label="Baseline (rig offline)" />
          <LegendDot color="hsl(var(--chart-2))" label="Observed (rig active)" />
          <span className="ml-auto text-mono-num text-muted-foreground">Δ peak: W +48%</span>
        </div>
      </CardContent>
    </Card>
  );
}

function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-muted-foreground">
      <span className="h-2 w-2 rounded-sm" style={{ backgroundColor: color }} />
      {label}
    </span>
  );
}
