import { Activity, ArrowUpRight, Info, Sigma, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

type Stat = {
  label: string;
  value: React.ReactNode;
  delta?: string;
  trend: "up" | "neutral" | "good";
  icon: React.ComponentType<{ className?: string }>;
  hint: string;
  info?: string;
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
    hint: "Out-of-sample coefficient of determination on held-out folds.",
    info: "Coefficient of determination: Represents the proportion of variance for Ozone that's explained by the independent variables in the model.",
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
    info: "Indicates statistical significance: a p-value < 0.05 suggests that the observed rise in O₃ during rig operations is not due to random chance.",
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
        <Card
          key={s.label}
          className="group relative overflow-hidden border-border bg-gradient-card shadow-elev-sm transition-base hover:-translate-y-1 hover:shadow-glow hover:border-accent/40 animate-fade-in-up"
          style={{ animationDelay: `${i * 70}ms` }}
        >
          <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-accent opacity-0 transition-base group-hover:opacity-100" />
          <CardContent className="p-5">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-1.5">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {s.label}
                </p>
                {s.info && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        type="button"
                        aria-label={`More info about ${s.label}`}
                        className="inline-flex h-4 w-4 items-center justify-center rounded-full text-muted-foreground/60 transition-base hover:text-accent"
                      >
                        <Info className="h-3 w-3" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="top" className="max-w-xs text-xs leading-relaxed">
                      {s.info}
                    </TooltipContent>
                  </Tooltip>
                )}
              </div>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span
                    className={`inline-flex h-7 w-7 items-center justify-center rounded-md ring-1 ${trendStyles[s.trend]}`}
                  >
                    <s.icon className="h-3.5 w-3.5" />
                  </span>
                </TooltipTrigger>
                <TooltipContent side="left" className="max-w-xs">
                  {s.hint}
                </TooltipContent>
              </Tooltip>
            </div>
            <p className="text-mono-num mt-3 font-display text-3xl font-bold text-foreground sm:text-[2rem]">
              {s.value}
            </p>
            {s.delta && (
              <p className="mt-1.5 text-[11px] text-muted-foreground">{s.delta}</p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
