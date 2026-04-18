import {
  Activity,
  Brain,
  CheckCircle2,
  Database,
  Filter,
  Sparkles,
  Target,
  TrendingUp,
  Wand2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const DATA_FACTS = [
  { label: "Source", value: "Sharon-Carmel Municipal Env. Assoc." },
  { label: "Timeline", value: "6-year hourly · 2017 — 2025" },
  { label: "Variables", value: "O₃ · Wind Dir/Speed · Solar Rad. · Temp" },
  { label: "Stations", value: "5 coastal monitors" },
];

const PIPELINE: {
  icon: typeof Database;
  title: string;
  detail: string;
  tag: string;
}[] = [
  {
    icon: Database,
    title: "Data Cleaning",
    detail: "Outlier removal, unit harmonization, and timestamp alignment across 5 stations.",
    tag: "Step 1",
  },
  {
    icon: Wand2,
    title: "KNN-Imputation",
    detail: "Missing values reconstructed from k-nearest meteorological neighbors.",
    tag: "Step 2",
  },
  {
    icon: Filter,
    title: "Westerly Wind Filtering",
    detail: "Constrained to stable 240°–300° regimes at 3–9 m/s for source isolation.",
    tag: "Step 3",
  },
  {
    icon: Brain,
    title: "XGBoost Modeling",
    detail: "Gradient-boosted regressor benchmarked against linear & RF baselines.",
    tag: "Step 4",
  },
];

export function ResearchJourneySection() {
  return (
    <div className="space-y-6">
      {/* Mission */}
      <Card className="overflow-hidden border-border bg-gradient-card shadow-elev-sm">
        <div className="h-1 bg-gradient-accent" />
        <CardHeader className="gap-2 pb-3">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-primary/5 text-primary ring-1 ring-primary/15">
                <Target className="h-4 w-4" />
              </span>
              <div>
                <CardDescription className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                  Project Mission
                </CardDescription>
                <CardTitle className="font-display text-base sm:text-lg leading-snug">
                  Quantifying the Leviathan Platform's Impact on Coastal Ozone
                </CardTitle>
              </div>
            </div>
            <Badge variant="secondary" className="border border-border text-[10px] uppercase tracking-wider">
              The Why
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed text-muted-foreground">
            This research applies <span className="font-semibold text-foreground">machine learning</span> to a
            decade-scale environmental dataset to isolate, quantify, and statistically validate the
            attributable contribution of the offshore <span className="font-semibold text-foreground">Leviathan natural gas rig</span> to
            tropospheric O₃ at the Eastern Mediterranean coastline — turning noisy meteorological signals
            into evidence-grade policy input.
          </p>
        </CardContent>
      </Card>

      {/* Data Engine */}
      <Card className="border-border bg-gradient-card shadow-elev-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-primary/5 text-primary ring-1 ring-primary/15">
                <Database className="h-4 w-4" />
              </span>
              <div>
                <CardDescription className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                  The Data Engine
                </CardDescription>
                <CardTitle className="font-display text-base">High-resolution multi-station record</CardTitle>
              </div>
            </div>
            <Badge variant="secondary" className="border border-border text-[10px] uppercase tracking-wider">
              The What
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2 sm:grid-cols-2">
            {DATA_FACTS.map((f) => (
              <div
                key={f.label}
                className="rounded-md border border-border bg-background/50 px-3 py-2.5"
              >
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{f.label}</p>
                <p className="mt-0.5 text-xs font-medium text-foreground">{f.value}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Preprocessing Pipeline */}
      <Card className="border-border bg-gradient-card shadow-elev-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-primary/5 text-primary ring-1 ring-primary/15">
                <Activity className="h-4 w-4" />
              </span>
              <div>
                <CardDescription className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                  Preprocessing Pipeline
                </CardDescription>
                <CardTitle className="font-display text-base">From raw signal to model-ready dataset</CardTitle>
              </div>
            </div>
            <Badge variant="secondary" className="border border-border text-[10px] uppercase tracking-wider">
              The How
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <ol className="relative space-y-4 border-l border-dashed border-border/80 pl-6">
            {PIPELINE.map((step, idx) => (
              <li key={step.title} className="relative">
                <span className="absolute -left-[33px] flex h-6 w-6 items-center justify-center rounded-full border border-border bg-background text-[10px] font-bold text-foreground shadow-elev-sm">
                  {idx + 1}
                </span>
                <div className="rounded-lg border border-border bg-background/60 p-3 transition-base hover:border-accent/40 hover:shadow-elev-sm">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-primary/5 text-primary ring-1 ring-primary/10">
                        <step.icon className="h-3.5 w-3.5" />
                      </span>
                      <p className="text-sm font-semibold text-foreground">{step.title}</p>
                    </div>
                    <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                      {step.tag}
                    </span>
                  </div>
                  <p className="mt-1.5 text-[12px] leading-relaxed text-muted-foreground">
                    {step.detail}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>

      {/* Conclusion summary card */}
      <Card className="overflow-hidden border-accent/40 bg-gradient-accent/10 shadow-elev-md">
        <div className="h-1 bg-gradient-accent" />
        <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-gradient-accent text-accent-foreground shadow-glow">
              <TrendingUp className="h-5 w-5" />
            </span>
            <div>
              <p className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                Final Result
              </p>
              <p className="font-display text-xl font-semibold leading-tight text-foreground sm:text-2xl">
                +12.6% O₃ Attributable Impact
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Welch's t-test ·{" "}
                <span className="text-mono-num font-semibold text-foreground">p &lt; 0.05</span> · isolated
                under stable westerly regimes
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge className="border border-accent/30 bg-accent/15 text-accent text-[10px] uppercase tracking-wider hover:bg-accent/20">
              <CheckCircle2 className="mr-1 h-3 w-3" /> Statistically significant
            </Badge>
            <Badge variant="secondary" className="border border-border text-[10px] uppercase tracking-wider">
              XGBoost · R² 0.361
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* About the Researcher */}
      <Card className="border-border bg-gradient-card shadow-elev-sm">
        <CardContent className="flex items-start gap-3 p-4">
          <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-primary/5 text-primary ring-1 ring-primary/15">
            <Sparkles className="h-4 w-4" />
          </span>
          <div className="space-y-1">
            <p className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
              About the Researcher
            </p>
            <p className="text-sm leading-relaxed text-foreground">
              Developed by <span className="font-semibold">Michelle Shumilov</span> as part of a deep-dive
              environmental data science study.
            </p>
            <p className="text-[11px] leading-relaxed text-muted-foreground">
              CS Student · Ruppin Academic Center · Excellence Scholarship · Year 1 GPA: 94
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
