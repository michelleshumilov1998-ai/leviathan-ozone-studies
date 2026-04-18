import { Activity, ArrowUpRight, Sigma, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

type Stat = {
  label: string;
  value: React.ReactNode;
  delta?: string;
  trend: "up" | "neutral" | "good";
  icon: React.ComponentType<{ className?: string }>;
  hint: string;
};

const stats: Stat[] = [
  {
    label: "Operational Impact",
    value: (
      <>
        +12.6% <span className="text-base font-semibold text-muted-foreground">O₃</span>
      </>
    ),
    delta: "vs. baseline (rig offline)",
    trend: "up",
    icon: ArrowUpRight,
    hint: "Mean O₃ enhancement attributable to rig operations under filtered westerly conditions.",
  },
  {
    label: "Model Improvement",
    value: "19%",
    delta: "RMSE reduction (XGBoost vs. linear)",
    trend: "good",
    icon: TrendingUp,
    hint: "Relative reduction in root-mean-square error from baseline OLS to gradient-boosted ensemble.",
  },
  {
    label: "Predictive Power (R²)",
    value: "0.361",
    delta: "Out-of-sample, 5-fold CV",
    trend: "neutral",
    icon: Activity,
    hint: "Coefficient of determination on held-out folds; consistent with high-noise atmospheric regimes.",
  },
  {
    label: "Statistical Significance",
    value: (
      <>
        p &lt; <span className="text-mono-num">0.05</span>
      </>
    ),
    delta: "Two-sided Welch's t-test",
    trend: "good",
    icon: Sigma,
    hint: "Difference in O₃ distribution between rig-on and rig-off windows is statistically significant.",
  },
];

const trendStyles: Record<Stat["trend"], string> = {
  up: "text-accent bg-accent/10 ring-accent/20",
  good: "text-success bg-success/10 ring-success/20",
  neutral: "text-muted-foreground bg-muted ring-border",
};

export function ImpactCards() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((s, i) => (
        <Tooltip key={s.label}>
          <TooltipTrigger asChild>
            <Card
              className="group relative cursor-default overflow-hidden border-border bg-gradient-card shadow-elev-sm transition-base hover:-translate-y-0.5 hover:shadow-elev-md animate-fade-in-up"
              style={{ animationDelay: `${i * 70}ms` }}
            >
              <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-accent opacity-0 transition-base group-hover:opacity-100" />
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    {s.label}
                  </p>
                  <span
                    className={`inline-flex h-7 w-7 items-center justify-center rounded-md ring-1 ${trendStyles[s.trend]}`}
                  >
                    <s.icon className="h-3.5 w-3.5" />
                  </span>
                </div>
                <p className="text-mono-num mt-3 font-display text-3xl font-bold text-foreground sm:text-[2rem]">
                  {s.value}
                </p>
                {s.delta && (
                  <p className="mt-1.5 text-[11px] text-muted-foreground">{s.delta}</p>
                )}
              </CardContent>
            </Card>
          </TooltipTrigger>
          <TooltipContent side="bottom" className="max-w-xs">
            {s.hint}
          </TooltipContent>
        </Tooltip>
      ))}
    </div>
  );
}
