import { useEffect, useRef, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Activity, Pause, Play } from "lucide-react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { AppSidebar } from "@/components/dashboard/AppSidebar";
import { StationProvider, useStation } from "@/components/dashboard/StationContext";
import { StationSelector } from "@/components/dashboard/StationSelector";
import { ChartActions } from "@/components/dashboard/ChartActions";
import { ThemeToggle } from "@/components/dashboard/ThemeToggle";

const WINDOW = 40;

function fmt(d: Date) {
  return d.toLocaleTimeString([], { hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" });
}

function genReading(prev: number, factor: number) {
  const drift = (Math.random() - 0.5) * 4;
  const oscillation = Math.sin(Date.now() / 4000) * 3;
  const next = prev + drift + oscillation * 0.4;
  // mean-revert toward 55 * factor
  const target = 55 * factor;
  const reverted = next + (target - next) * 0.08;
  return Math.max(15, Math.min(110, reverted));
}

function LiveContent() {
  const { station } = useStation();
  const [running, setRunning] = useState(true);
  const [series, setSeries] = useState<Array<{ t: string; v: number }>>(() => {
    const now = Date.now();
    const arr: Array<{ t: string; v: number }> = [];
    let v = 55 * station.factor;
    for (let i = WINDOW - 1; i >= 0; i--) {
      v = genReading(v, station.factor);
      arr.push({ t: fmt(new Date(now - i * 2000)), v: Math.round(v * 10) / 10 });
    }
    return arr;
  });
  const lastRef = useRef<number>(series[series.length - 1].v);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      const next = genReading(lastRef.current, station.factor);
      lastRef.current = next;
      setSeries((prev) => {
        const updated = [...prev.slice(1), { t: fmt(new Date()), v: Math.round(next * 10) / 10 }];
        return updated;
      });
    }, 1500);
    return () => clearInterval(id);
  }, [running, station.factor]);

  const current = series[series.length - 1].v;
  const min = Math.min(...series.map((s) => s.v));
  const max = Math.max(...series.map((s) => s.v));
  const avg = series.reduce((a, b) => a + b.v, 0) / series.length;
  const status = current > 70 ? { label: "Elevated", cls: "text-warning bg-warning/10 ring-warning/30" }
    : current > 90 ? { label: "Alert", cls: "text-destructive bg-destructive/10 ring-destructive/30" }
    : { label: "Normal", cls: "text-success bg-success/10 ring-success/30" };

  return (
    <div className="flex flex-1 flex-col">
      <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-border bg-background/85 px-4 backdrop-blur-md">
        <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
        <Separator orientation="vertical" className="h-5" />
        <div className="hidden items-center gap-1.5 text-xs text-muted-foreground sm:flex">
          <span>System</span>
          <span className="text-muted-foreground/40">/</span>
          <span className="font-medium text-foreground">Live Monitor</span>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <StationSelector />
        </div>
      </header>

      <main className="flex-1 space-y-6 p-4 sm:p-6 lg:p-8">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="font-display text-2xl font-bold">Live Monitor</h1>
            <p className="text-sm text-muted-foreground">
              Real-time O₃ sensor stream from <span className="font-medium text-foreground">{station.name}</span>
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setRunning((r) => !r)}
            className="h-8 gap-1.5"
          >
            {running ? <><Pause className="h-3.5 w-3.5" /> Pause stream</> : <><Play className="h-3.5 w-3.5" /> Resume</>}
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <LiveStat label="Current" value={`${current.toFixed(1)} ppb`} accent />
          <LiveStat label="60s Mean" value={`${avg.toFixed(1)} ppb`} />
          <LiveStat label="Window Min" value={`${min.toFixed(1)} ppb`} />
          <LiveStat label="Window Max" value={`${max.toFixed(1)} ppb`} />
        </div>

        <Card className="border-border bg-gradient-card shadow-elev-sm">
          <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
            <div>
              <CardTitle className="font-display text-base flex items-center gap-2">
                <Activity className="h-4 w-4 text-accent" />
                Current O₃ Sensor Readings (ppb)
              </CardTitle>
              <CardDescription className="mt-1 text-xs">
                Live telemetry · sampled every 1.5 seconds · {WINDOW} most recent points
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Badge className={`border ring-1 ${status.cls} bg-transparent text-[10px] uppercase tracking-wider`}>
                <span className={`mr-1.5 inline-block h-1.5 w-1.5 rounded-full ${running ? "animate-pulse-soft" : ""} bg-current`} />
                {running ? status.label : "Paused"}
              </Badge>
              <ChartActions />
            </div>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="h-[360px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={series} margin={{ top: 8, right: 12, left: -8, bottom: 0 }}>
                  <defs>
                    <linearGradient id="liveFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(var(--chart-2))" stopOpacity={0.45} />
                      <stop offset="100%" stopColor="hsl(var(--chart-2))" stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                  <XAxis
                    dataKey="t"
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }}
                    stroke="hsl(var(--border))"
                    interval={Math.floor(WINDOW / 8)}
                  />
                  <YAxis
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
                    stroke="hsl(var(--border))"
                    domain={[0, 120]}
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
                    formatter={(v: number) => [`${v.toFixed(1)} ppb`, "O₃"]}
                  />
                  <ReferenceLine y={70} stroke="hsl(var(--warning))" strokeDasharray="4 4" label={{ value: "Elevated", fill: "hsl(var(--warning))", fontSize: 10, position: "right" }} />
                  <ReferenceLine y={90} stroke="hsl(var(--destructive))" strokeDasharray="4 4" label={{ value: "Alert", fill: "hsl(var(--destructive))", fontSize: 10, position: "right" }} />
                  <Area
                    type="monotone"
                    dataKey="v"
                    stroke="hsl(var(--chart-2))"
                    strokeWidth={2.25}
                    fill="url(#liveFill)"
                    isAnimationActive={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

function LiveStat({ label, value, accent = false }: { label: string; value: string; accent?: boolean }) {
  return (
    <Card className={`border-border bg-gradient-card shadow-elev-sm ${accent ? "ring-1 ring-accent/30" : ""}`}>
      <CardContent className="p-4">
        <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">{label}</p>
        <p className={`text-mono-num mt-1 font-display text-2xl font-bold ${accent ? "text-accent" : "text-foreground"}`}>
          {value}
        </p>
      </CardContent>
    </Card>
  );
}

const LiveMonitor = () => (
  <StationProvider>
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar />
        <LiveContent />
      </div>
    </SidebarProvider>
  </StationProvider>
);

export default LiveMonitor;
