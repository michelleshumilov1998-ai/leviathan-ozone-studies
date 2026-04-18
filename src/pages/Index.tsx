import { Bell, Github, Search } from "lucide-react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { AppSidebar } from "@/components/dashboard/AppSidebar";
import { HeroHeader } from "@/components/dashboard/HeroHeader";
import { ImpactCards } from "@/components/dashboard/ImpactCards";
import { WindRoseChart } from "@/components/dashboard/WindRoseChart";
import { ForecastChart } from "@/components/dashboard/ForecastChart";
import { ModelPerformanceChart } from "@/components/dashboard/ModelPerformanceChart";
import { FeatureImportanceChart } from "@/components/dashboard/FeatureImportanceChart";
import { MethodologySection } from "@/components/dashboard/MethodologySection";
import { StationProvider } from "@/components/dashboard/StationContext";
import { StationSelector } from "@/components/dashboard/StationSelector";
import { FlaskConical } from "lucide-react";

const Index = () => {
  return (
    <StationProvider>
      <SidebarProvider>
        <div className="flex min-h-screen w-full bg-background">
          <AppSidebar />

          <div className="flex flex-1 flex-col">
            {/* Top bar */}
            <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-border bg-background/85 px-4 backdrop-blur-md">
              <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
              <Separator orientation="vertical" className="h-5" />
              <div className="hidden items-center gap-1.5 text-xs text-muted-foreground sm:flex">
                <span>Studies</span>
                <span className="text-muted-foreground/40">/</span>
                <span className="font-medium text-foreground">Ozone Impact · Leviathan</span>
              </div>

              <div className="ml-auto flex items-center gap-2">
                <div className="relative hidden lg:block">
                  <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search variables, stations, dates…"
                    className="h-8 w-56 pl-8 text-xs"
                  />
                </div>
                <StationSelector />
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="h-8 gap-1.5 text-xs"
                >
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="View source code on GitHub">
                    <Github className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">View Source Code</span>
                  </a>
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                  <Bell className="h-4 w-4" />
                </Button>
              </div>
            </header>

            <main className="flex-1 space-y-6 p-4 sm:p-6 lg:p-8">
              <HeroHeader />

              <section aria-labelledby="impact-heading" className="space-y-3">
                <div className="flex items-end justify-between">
                  <div>
                    <h2 id="impact-heading" className="font-display text-lg font-semibold">
                      Headline Findings
                    </h2>
                    <p className="text-xs text-muted-foreground">
                      Quantified impact metrics under filtered westerly regimes.
                    </p>
                  </div>
                </div>
                <ImpactCards />
              </section>

              <section className="grid gap-6 xl:grid-cols-2">
                <WindRoseChart />
                <ForecastChart />
              </section>

              <section className="grid gap-6 lg:grid-cols-[1fr_1.4fr]">
                <ModelPerformanceChart />
                <FeatureImportanceChart />
              </section>

              <section>
                <MethodologySection />
              </section>

              {/* Methodology note */}
              <div className="flex items-start gap-2.5 rounded-lg border border-dashed border-border bg-muted/30 px-4 py-3">
                <FlaskConical className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
                <p className="text-[11px] leading-relaxed text-muted-foreground">
                  <span className="font-semibold text-foreground">Methodology Note —</span>{" "}
                  Data processed using KNN-Imputation and validated through non-parametric Welch's t-tests.
                </p>
              </div>

              <footer className="flex flex-wrap items-center justify-between gap-2 border-t border-border pt-4 text-[11px] text-muted-foreground">
                <span>© 2026 Sharon-Carmel Municipal Environmental Association · Atmos Research Group</span>
                <span className="text-mono-num">Build v2.4.1 · Data refreshed 2026-04-17 06:00 UTC</span>
              </footer>
            </main>
          </div>
        </div>
      </SidebarProvider>
    </StationProvider>
  );
};

export default Index;
