import { Compass, Filter, Wind } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import logo from "@/assets/sharon-carmel-logo.png";

export function MethodologySection() {
  return (
    <Card className="border-border bg-gradient-card shadow-elev-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="font-display text-base">Methodology — Stable Westerly Wind Filter</CardTitle>
          <Badge variant="secondary" className="border border-border text-[10px] uppercase tracking-wider">
            Source Isolation
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
          <div className="space-y-3 text-sm leading-relaxed text-muted-foreground">
            <div className="flex items-center gap-3 rounded-lg border border-border bg-background/60 p-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-white/95 p-1 ring-1 ring-border dark:bg-white/90">
                <img src={logo} alt="Sharon-Carmel Municipal Environmental Association" className="h-full w-full object-contain" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Data Source</p>
                <p className="text-xs font-semibold text-foreground">
                  Sharon-Carmel Municipal Environmental Association
                </p>
                <p className="text-[11px] text-muted-foreground">Official monitoring network · 2017 — 2025</p>
              </div>
            </div>
            <p>
              To isolate the atmospheric signal of the <span className="font-semibold text-foreground">Leviathan natural gas rig</span> from
              regional background O<sub>3</sub>, we constrained the dataset to periods of{" "}
              <span className="font-semibold text-foreground">stable westerly winds</span>. This advective regime
              transports air masses directly from the rig toward the{" "}
              <span className="font-semibold text-foreground">5 primary coastal monitoring stations</span>,
              maximizing source attribution while minimizing confounding variability.
            </p>
            <p>
              Hourly observations were retained only when satisfying all three criteria simultaneously
              for a minimum of <span className="text-mono-num font-semibold text-foreground">3 consecutive hours</span> —
              ensuring trajectory stability and reducing the influence of frontal passages or turbulent
              mixing events that would otherwise dilute the source signature.
            </p>
            <p>
              The resulting filtered subset (~<span className="text-mono-num font-semibold text-foreground">14.2%</span> of
              the total record) forms the basis for the impact estimation, predictive modeling, and
              significance testing presented across this dashboard.
            </p>
            <p>
              Both <span className="font-semibold text-foreground">linear and non-linear models</span> were
              tested — Linear Regression, Neural Networks, Random Forest, and XGBoost — to capture the
              complex, non-additive chemistry of tropospheric ozone formation under varying meteorological
              regimes.
            </p>

            <figure className="mt-5 space-y-3 rounded-lg border border-accent/40 bg-accent/5 p-4">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-2 w-2 animate-pulse-soft rounded-full bg-accent" />
                <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-accent">
                  Combat Reserve Service · Author's Note
                </span>
              </div>
              <blockquote className="font-display text-[13px] italic leading-relaxed text-foreground/90">
                "This research was conducted and finalized alongside active combat reserve service,
                demonstrating resilience and rigorous time management."
              </blockquote>
              <p className="text-[12px] leading-relaxed text-foreground/80">
                Research conducted by <span className="font-semibold text-foreground">Michelle Shumilov</span>,
                CS Student at Ruppin Academic Center
                <span className="text-muted-foreground"> (Excellence Scholarship · Year 1 GPA: 94)</span>.
              </p>
            </figure>
          </div>

          <div className="space-y-2.5">
            <Criterion
              icon={Compass}
              label="Wind Direction"
              value="240° – 300°"
              note="Westerly sector — transport from rig to receptor"
            />
            <Criterion
              icon={Wind}
              label="Wind Speed"
              value="3 – 9 m/s"
              note="Sustained advection without high-turbulence regimes"
            />
            <Criterion
              icon={Filter}
              label="Stability Index"
              value="σ_θ < 15°"
              note="Directional steadiness over 3-hour rolling window"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function Criterion({
  icon: Icon,
  label,
  value,
  note,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  note: string;
}) {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-border bg-background/60 p-3 transition-base hover:border-accent/40 hover:shadow-elev-sm">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-primary/5 text-primary ring-1 ring-primary/10">
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-2">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</p>
          <p className="text-mono-num text-sm font-bold text-foreground">{value}</p>
        </div>
        <p className="mt-0.5 text-[11px] leading-snug text-muted-foreground">{note}</p>
      </div>
    </div>
  );
}
