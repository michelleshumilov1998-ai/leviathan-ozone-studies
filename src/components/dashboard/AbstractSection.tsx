import { BookOpen, FileText, Quote } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

const TITLE =
  "Attributable Impact of Offshore Natural Gas Operations on Coastal Tropospheric Ozone (O₃) Concentrations: A Machine Learning Approach.";

const META = [
  { label: "Domain", value: "Atmospheric Chemistry" },
  { label: "Method", value: "XGBoost · Welch's t-test" },
  { label: "Dataset", value: "6-year hourly · KNN-imputed" },
  { label: "Region", value: "Eastern Mediterranean" },
];

export function AbstractSection() {
  return (
    <section id="abstract" aria-labelledby="abstract-title" className="scroll-mt-20">
      <Card className="overflow-hidden border-border bg-gradient-card shadow-elev-md">
        <div className="h-1 bg-gradient-accent" />
        <CardHeader className="gap-2 pb-3">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-primary/5 text-primary ring-1 ring-primary/15">
                <BookOpen className="h-4 w-4" />
              </span>
              <div>
                <CardDescription className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                  Scientific Abstract
                </CardDescription>
                <CardTitle id="abstract-title" className="font-display text-base sm:text-lg leading-snug">
                  Attributable Impact of Offshore Natural Gas Operations on Coastal Tropospheric O₃
                </CardTitle>
              </div>
            </div>
            <Badge variant="secondary" className="border border-border text-[10px] uppercase tracking-wider">
              Peer-Reviewed
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-5">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {META.map((m) => (
              <div key={m.label} className="rounded-md border border-border bg-background/40 px-3 py-2">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{m.label}</p>
                <p className="mt-0.5 text-xs font-medium text-foreground">{m.value}</p>
              </div>
            ))}
          </div>

          <p className="text-sm leading-relaxed text-muted-foreground">
            This study investigates the correlation between the operational status of the{" "}
            <span className="font-semibold text-foreground">'Leviathan' natural gas platform</span> and
            coastal air quality, focusing on tropospheric ozone (O₃) in the Eastern Mediterranean basin.
            A 6-year hourly dataset was processed through KNN-Imputation and meteorological normalization;
            the analysis was then constrained to stable westerly wind regimes to isolate the platform's
            signature from regional background pollution…
          </p>

          <div className="flex flex-wrap items-center gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm" className="h-8 gap-1.5 bg-gradient-accent text-accent-foreground shadow-glow hover:opacity-90">
                  <FileText className="h-3.5 w-3.5" />
                  Read Full Abstract
                </Button>
              </DialogTrigger>
              <AbstractDialog />
            </Dialog>
            <span className="text-[11px] text-muted-foreground">
              ~1 min read · Findings · Methods · Implications
            </span>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

function AbstractDialog() {
  return (
    <DialogContent className="max-w-2xl gap-0 overflow-hidden p-0">
      <div className="h-1 bg-gradient-accent" />
      <DialogHeader className="space-y-3 px-6 pb-3 pt-5">
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="border border-border text-[10px] uppercase tracking-wider">
            Scientific Abstract
          </Badge>
          <Badge className="border border-accent/30 bg-accent/15 text-accent text-[10px] uppercase tracking-wider hover:bg-accent/20">
            Machine Learning
          </Badge>
        </div>
        <DialogTitle className="font-display text-lg leading-snug">{TITLE}</DialogTitle>
        <DialogDescription className="text-[11px] uppercase tracking-wider">
          Atmos Research Group · Sharon-Carmel Municipal Environmental Association
        </DialogDescription>
      </DialogHeader>

      <ScrollArea className="max-h-[60vh] px-6 pb-6">
        <div className="space-y-4 pr-3 text-sm leading-relaxed text-muted-foreground">
          <p>
            This study investigates the correlation between the operational status of the{" "}
            <span className="font-semibold text-foreground">'Leviathan' natural gas platform</span> and
            coastal air quality, specifically focusing on tropospheric ozone (O₃) levels in the Eastern
            Mediterranean basin. Utilizing a high-resolution, 6-year hourly dataset, we implemented a
            rigorous preprocessing pipeline including{" "}
            <span className="font-semibold text-foreground">KNN-Imputation</span> for missing data and
            meteorological normalization.
          </p>

          <p>
            To isolate the platform's signature from regional background pollution, the analysis was
            constrained to stable westerly wind regimes (
            <span className="text-mono-num font-semibold text-foreground">240° – 300°</span>) with
            sustained wind speeds (
            <span className="text-mono-num font-semibold text-foreground">3 – 9 m/s</span>). Predictive
            modeling was conducted using an{" "}
            <span className="font-semibold text-foreground">XGBoost regressor</span>, which outperformed
            baseline linear models with a{" "}
            <span className="text-mono-num font-semibold text-foreground">19%</span> reduction in RMSE
            and an R² of <span className="text-mono-num font-semibold text-foreground">0.361</span>.
          </p>

          <div className="rounded-lg border border-border bg-muted/30 p-4">
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-foreground">
              Key Findings
            </p>
            <p>
              Statistical auditing via non-parametric Welch's t-tests (
              <span className="text-mono-num font-semibold text-foreground">p &lt; 0.05</span>) revealed
              a <span className="text-mono-num font-semibold text-foreground">12.6%</span> increase in
              O₃ concentrations during active operational periods compared to baseline offline states.
              Feature importance analysis identified{" "}
              <span className="font-semibold text-foreground">'Operational Status'</span> as a primary
              predictor alongside solar radiation. These results suggest a significant attributable
              impact of offshore emissions on coastal atmospheric chemistry, highlighting the need for
              enhanced monitoring and data-driven policy interventions.
            </p>
          </div>

          <figure className="border-l-2 border-accent/60 pl-4">
            <Quote className="mb-1 h-3.5 w-3.5 text-accent/70" />
            <blockquote className="font-display text-[13px] italic leading-relaxed text-foreground/85">
              "This research was conducted and finalized alongside active combat reserve service,
              demonstrating resilience and rigorous time management."
            </blockquote>
            <figcaption className="mt-1.5 text-[10px] uppercase tracking-wider text-muted-foreground">
              — Author's note
            </figcaption>
          </figure>
        </div>
      </ScrollArea>
    </DialogContent>
  );
}
