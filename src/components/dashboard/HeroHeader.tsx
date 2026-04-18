import { Calendar, MapPin, Wind } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function HeroHeader() {
  return (
    <section className="relative overflow-hidden rounded-xl bg-gradient-hero shadow-elev-lg">
      {/* Decorative grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(hsl(0 0% 100%) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 100%) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-chart-3/20 blur-3xl" />

      <div className="relative px-6 py-10 sm:px-10 sm:py-14 lg:py-16">
        <div className="flex flex-wrap items-center gap-2">
          <Badge className="border border-primary-foreground/20 bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/15">
            Peer-Reviewed Study
          </Badge>
          <Badge className="border border-primary-foreground/20 bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/15">
            Atmospheric Sciences
          </Badge>
          <Badge className="border border-accent/30 bg-accent/20 text-primary-foreground hover:bg-accent/30">
            v2.4 · Updated April 2026
          </Badge>
        </div>

        <h1 className="mt-5 max-w-4xl font-display text-3xl font-bold leading-tight text-primary-foreground sm:text-4xl lg:text-5xl">
          Ozone Forecasting & Environmental Impact Study
        </h1>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-primary-foreground/75 sm:text-base">
          A multi-year analysis of tropospheric O<sub>3</sub> transport, model skill, and attributable
          emissions impact downwind of the Leviathan natural gas rig — filtered under stable westerly
          wind regimes for source isolation.
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-primary-foreground/70">
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5" /> Eastern Mediterranean Basin
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5" /> 6-year hourly dataset
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Wind className="h-3.5 w-3.5" /> Westerly sector: 240°–300°
          </span>
        </div>
      </div>
    </section>
  );
}
