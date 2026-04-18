import {
  Area,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
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
  { t: "00:00", actual: 32, predicted: 30, lo: 26, hi: 34 },
  { t: "02:00", actual: 28, predicted: 27, lo: 23, hi: 31 },
  { t: "04:00", actual: 25, predicted: 26, lo: 22, hi: 30 },
  { t: "06:00", actual: 30, predicted: 31, lo: 27, hi: 35 },
  { t: "08:00", actual: 42, predicted: 40, lo: 35, hi: 45 },
  { t: "10:00", actual: 55, predicted: 52, lo: 47, hi: 57 },
  { t: "12:00", actual: 68, predicted: 64, lo: 58, hi: 70 },
  { t: "14:00", actual: 74, predicted: 71, lo: 64, hi: 78 },
  { t: "16:00", actual: 71, predicted: 69, lo: 62, hi: 76 },
  { t: "18:00", actual: 60, predicted: 62, lo: 55, hi: 69 },
  { t: "20:00", actual: 48, predicted: 50, lo: 44, hi: 56 },
  { t: "22:00", actual: 38, predicted: 39, lo: 34, hi: 44 },
];

export function ForecastChart() {
  const { station } = useStation();
  const f = station.factor;
  const data = base.map((d) => ({
    t: d.t,
    actual: Math.round(d.actual * f),
    predicted: Math.round(d.predicted * f),
    lo: Math.round(d.lo * f),
    hi: Math.round(d.hi * f),
  }));

  return (
    <Card className="border-border bg-gradient-card shadow-elev-sm">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="font-display text-base">
            Predicted O₃ Levels vs. Actual Observations
          </CardTitle>
          <CardDescription className="mt-1 text-xs">
            Diurnal cycle, 24-hour mean — XGBoost forecast with 95% confidence band
          </CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="border border-border text-[10px] uppercase tracking-wider">
            Time Series
          </Badge>
          <ChartActions />
        </div>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={data} margin={{ top: 8, right: 12, left: -8, bottom: 0 }}>
              <defs>
                <linearGradient id="bandFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--chart-2))" stopOpacity={0.22} />
                  <stop offset="100%" stopColor="hsl(var(--chart-2))" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis
                dataKey="t"
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
                stroke="hsl(var(--border))"
              />
              <YAxis
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
                stroke="hsl(var(--border))"
                label={{
                  value: "O₃ (ppb)",
                  angle: -90,
                  position: "insideLeft",
                  offset: 18,
                  style: { fill: "hsl(var(--muted-foreground))", fontSize: 11 },
                }}
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
              <Legend wrapperStyle={{ fontSize: "11px", paddingTop: "6px" }} iconType="circle" />
              <Area type="monotone" dataKey="hi" stroke="none" fill="url(#bandFill)" name="95% CI" isAnimationActive={false} />
              <Area type="monotone" dataKey="lo" stroke="none" fill="hsl(var(--background))" fillOpacity={1} legendType="none" isAnimationActive={false} />
              <Line type="monotone" dataKey="actual" stroke="hsl(var(--chart-1))" strokeWidth={2.25} dot={{ r: 3, fill: "hsl(var(--chart-1))" }} activeDot={{ r: 5 }} name="Actual" />
              <Line type="monotone" dataKey="predicted" stroke="hsl(var(--chart-2))" strokeWidth={2.25} strokeDasharray="5 4" dot={false} name="Predicted" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
