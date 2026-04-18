import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChartActions } from "./ChartActions";
import { useStation } from "./StationContext";

const base = [
  { model: "Linear Reg.", r2: 0.218, rmse: 9.4, color: "hsl(var(--chart-4))", note: "Baseline" },
  { model: "Neural Net", r2: 0.290, rmse: 8.4, color: "hsl(var(--chart-5))", note: "Deep Learning" },
  { model: "Random Forest", r2: 0.314, rmse: 8.1, color: "hsl(var(--chart-3))", note: "Tree Ensemble" },
  { model: "XGBoost", r2: 0.361, rmse: 7.6, color: "hsl(var(--chart-2))", note: "Champion" },
];

export function ModelPerformanceChart() {
  const { station } = useStation();
  const data = base.map((d) => ({
    ...d,
    r2: Math.round(d.r2 * (0.94 + station.factor * 0.06) * 1000) / 1000,
    rmse: Math.round(d.rmse * (1.04 - station.factor * 0.04) * 10) / 10,
  }));

  return (
    <Card className="border-border bg-gradient-card shadow-elev-sm">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="font-display text-base">Model Performance Comparison</CardTitle>
          <CardDescription className="mt-1 text-xs">
            Performance comparison across Linear, Tree-based, and Deep Learning architectures.
          </CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="border border-border text-[10px] uppercase tracking-wider">
            Benchmark
          </Badge>
          <ChartActions />
        </div>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="h-[260px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 18, right: 12, left: -12, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis
                dataKey="model"
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11, fontWeight: 600 }}
                stroke="hsl(var(--border))"
              />
              <YAxis
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
                stroke="hsl(var(--border))"
                domain={[0, 0.5]}
              />
              <Tooltip
                cursor={{ fill: "hsl(var(--muted))", opacity: 0.4 }}
                contentStyle={{
                  backgroundColor: "hsl(var(--popover))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  fontSize: "12px",
                  boxShadow: "var(--shadow-md)",
                }}
                labelStyle={{ color: "hsl(var(--foreground))", fontWeight: 600 }}
                formatter={(v: number, name) => [name === "r2" ? v.toFixed(3) : v, name === "r2" ? "R²" : name]}
              />
              <Bar dataKey="r2" radius={[6, 6, 0, 0]} maxBarSize={72}>
                {data.map((d) => (
                  <Cell key={d.model} fill={d.color} />
                ))}
                <LabelList
                  dataKey="r2"
                  position="top"
                  formatter={(v: number) => v.toFixed(3)}
                  style={{ fill: "hsl(var(--foreground))", fontSize: 11, fontWeight: 700 }}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2 border-t border-border pt-3 text-[11px] sm:grid-cols-4">
          {data.map((d) => {
            const isChampion = d.model === "XGBoost";
            return (
              <div
                key={d.model}
                className={`rounded-md px-2 py-1.5 ${
                  isChampion
                    ? "border border-accent/40 bg-accent/10 ring-1 ring-accent/20"
                    : "bg-muted/40"
                }`}
              >
                <div className="flex items-center justify-between gap-1">
                  <p className="font-medium text-foreground">{d.model}</p>
                  <span
                    className={`text-[9px] uppercase tracking-wider ${
                      isChampion ? "font-semibold text-accent" : "text-muted-foreground"
                    }`}
                  >
                    {isChampion ? "★ Champion" : d.note}
                  </span>
                </div>
                <p className="text-mono-num text-muted-foreground">RMSE {d.rmse} ppb</p>
              </div>
            );
          })}
        </div>

        <p className="mt-3 rounded-md border border-dashed border-border bg-muted/30 px-3 py-2 text-[11px] leading-relaxed text-muted-foreground">
          <span className="font-semibold text-foreground">Selection note —</span> While Neural Networks and
          Random Forest showed strong performance, <span className="font-semibold text-foreground">XGBoost</span>{" "}
          was selected as the final production model due to its superior RMSE (
          <span className="text-mono-num font-semibold text-foreground">7.6 ppb</span>) and feature
          interpretability.
        </p>
      </CardContent>
    </Card>
  );
}
