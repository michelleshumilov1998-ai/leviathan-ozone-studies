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
  { feature: "Operational Status", importance: 0.34 },
  { feature: "Solar Radiation", importance: 0.24 },
  { feature: "Ambient Temperature", importance: 0.18 },
  { feature: "Wind Sector", importance: 0.14 },
  { feature: "Relative Humidity", importance: 0.10 },
];

export function FeatureImportanceChart() {
  const { station } = useStation();
  const data = base.map((d, i) => ({
    ...d,
    importance: Math.round(d.importance * (0.92 + station.factor * 0.08 + i * 0.005) * 1000) / 1000,
  }));

  const palette = [
    "hsl(var(--chart-1))",
    "hsl(var(--chart-2))",
    "hsl(var(--chart-3))",
    "hsl(var(--chart-4))",
    "hsl(var(--chart-5))",
  ];

  return (
    <Card className="border-border bg-gradient-card shadow-elev-sm">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="font-display text-base">
            Predictive Feature Importance (XGBoost)
          </CardTitle>
          <CardDescription className="mt-1 text-xs">
            Relative gain-based contribution of each variable to O₃ prediction
          </CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="border border-border text-[10px] uppercase tracking-wider">
            SHAP-aligned
          </Badge>
          <ChartActions />
        </div>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              layout="vertical"
              margin={{ top: 4, right: 36, left: 8, bottom: 0 }}
              barCategoryGap={10}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
              <XAxis
                type="number"
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
                stroke="hsl(var(--border))"
                domain={[0, 0.4]}
                tickFormatter={(v) => `${Math.round(v * 100)}%`}
              />
              <YAxis
                type="category"
                dataKey="feature"
                width={140}
                tick={{ fill: "hsl(var(--foreground))", fontSize: 11, fontWeight: 600 }}
                stroke="hsl(var(--border))"
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
                formatter={(v: number) => [`${(v * 100).toFixed(1)}%`, "Importance"]}
              />
              <Bar dataKey="importance" radius={[0, 6, 6, 0]} maxBarSize={26}>
                {data.map((_, i) => (
                  <Cell key={i} fill={palette[i % palette.length]} />
                ))}
                <LabelList
                  dataKey="importance"
                  position="right"
                  formatter={(v: number) => `${(v * 100).toFixed(1)}%`}
                  style={{ fill: "hsl(var(--foreground))", fontSize: 11, fontWeight: 700 }}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
