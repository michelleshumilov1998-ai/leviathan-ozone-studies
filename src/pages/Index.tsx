import { useEffect } from "react";
import { Github, Linkedin, Search } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { AppSidebar, type SectionId } from "@/components/dashboard/AppSidebar";
import { HeroHeader } from "@/components/dashboard/HeroHeader";
import { ImpactCards } from "@/components/dashboard/ImpactCards";
import { WindRoseChart } from "@/components/dashboard/WindRoseChart";
import { ForecastChart } from "@/components/dashboard/ForecastChart";
import { ModelPerformanceChart } from "@/components/dashboard/ModelPerformanceChart";
import { FeatureImportanceChart } from "@/components/dashboard/FeatureImportanceChart";
import { MethodologySection } from "@/components/dashboard/MethodologySection";
import { AbstractSection } from "@/components/dashboard/AbstractSection";
import { ResearchJourneySection } from "@/components/dashboard/ResearchJourneySection";
import { StationProvider } from "@/components/dashboard/StationContext";
import { StationSelector } from "@/components/dashboard/StationSelector";
import { ThemeToggle } from "@/components/dashboard/ThemeToggle";
import { WhitepaperButton } from "@/components/dashboard/WhitepaperButton";

const SECTION_TITLES: Record<SectionId, string> = {
  overview: "Overview",
  spatial: "Spatial Analysis",
  forecast: "Forecast vs Actual",
  models: "Model Performance",
  methodology: "Methodology",
  journey: "Research Journey",
  abstract: "Scientific Abstract",
};

const Index = () => {
  const [searchParams] = useSearchParams();
  const section = (searchParams.get("section") as SectionId) || "overview";

  // Reset scroll to top whenever the active section changes.
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    const main = document.querySelector("main");
    if (main) main.scrollTop = 0;
  }, [section]);

  return (
    <StationProvider>
      <SidebarProvider>
        <div className="flex min-h-screen w-full bg-background">
          <AppSidebar />

          <div className="flex flex-1 flex-col">
            {/* Top bar */}
            <header className="sticky top-0 z-30 flex h-14 items-center gap-2 border-b border-border bg-background/85 px-3 backdrop-blur-md sm:gap-3 sm:px-4">
              <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
              <Separator orientation="vertical" className="hidden h-5 sm:block" />
              <div className="hidden items-center gap-1.5 text-xs text-muted-foreground md:flex">
                <span>Studies</span>
                <span className="text-muted-foreground/40">/</span>
                <span>Ozone Impact · Leviathan</span>
                <span className="text-muted-foreground/40">/</span>
                <span className="font-medium text-foreground">{SECTION_TITLES[section]}</span>
              </div>

              <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
                <div className="relative hidden xl:block">
                  <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search variables, stations, dates…"
                    className="h-8 w-56 pl-8 text-xs"
                  />
                </div>
                <StationSelector />
                <Button
                  asChild
                  variant="ghost"
                  size="icon"
                  className="hidden h-8 w-8 text-muted-foreground hover:text-foreground sm:inline-flex"
                >
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="View source code on GitHub"
                  >
                    <Github className="h-4 w-4" />
                  </a>
                </Button>
                <Button
                  asChild
                  variant="ghost"
                  size="icon"
                  className="hidden h-8 w-8 text-muted-foreground hover:text-foreground sm:inline-flex"
                >
                  <a
                    href="https://www.linkedin.com/in/michelle-shumilov"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Connect with Michelle Shumilov on LinkedIn"
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                </Button>
                <WhitepaperButton />
                <ThemeToggle />
              </div>
            </header>

            <main key={section} className="flex-1 space-y-6 p-4 sm:p-6 lg:p-8">
              {section === "overview" && (
                <>
                  <HeroHeader />
                  <section aria-labelledby="impact-heading" className="space-y-3">
                    <div>
                      <h2 id="impact-heading" className="font-display text-lg font-semibold">
                        Headline Findings
                      </h2>
                      <p className="text-xs text-muted-foreground">
                        Quantified impact metrics under filtered westerly regimes.
                      </p>
                    </div>
                    <ImpactCards />
                  </section>
                  <section className="grid gap-4 sm:gap-6 xl:grid-cols-2">
                    <WindRoseChart />
                    <ForecastChart />
                  </section>
                  <section className="grid gap-4 sm:gap-6 lg:grid-cols-[1fr_1.4fr]">
                    <ModelPerformanceChart />
                    <FeatureImportanceChart />
                  </section>
                </>
              )}

              {section === "spatial" && (
                <section className="space-y-4">
                  <SectionHeader
                    title="Spatial Sector Analysis"
                    subtitle="O₃ transport rose for Maayan Zvi & Caesarea — peak westerly impact (240°–300°)."
                  />
                  <div className="grid gap-4 sm:gap-6 xl:grid-cols-2">
                    <WindRoseChart stationOverride="mz" />
                    <WindRoseChart stationOverride="caesarea" />
                  </div>
                </section>
              )}

              {section === "forecast" && (
                <section className="space-y-4">
                  <SectionHeader
                    title="Forecast vs Actual Observations"
                    subtitle="24-hour diurnal cycle — XGBoost predictions tracking actuals (19% RMSE improvement)."
                  />
                  <ForecastChart />
                </section>
              )}

              {section === "models" && (
                <section className="space-y-4">
                  <SectionHeader
                    title="Model Performance Comparison"
                    subtitle="Linear Reg. (R²=0.218 · RMSE 9.4) · Random Forest (R²=0.314 · RMSE 8.1) · XGBoost (R²=0.361 · RMSE 7.6 ppb)."
                  />
                  <div className="grid gap-4 sm:gap-6 lg:grid-cols-[1fr_1.4fr]">
                    <ModelPerformanceChart />
                    <FeatureImportanceChart />
                  </div>
                </section>
              )}

              {section === "methodology" && (
                <section className="space-y-4">
                  <SectionHeader
                    title="Methodology"
                    subtitle="KNN-Imputation pipeline and stable westerly wind filtering."
                  />
                  <MethodologySection />
                </section>
              )}

              {section === "journey" && (
                <section className="space-y-4">
                  <SectionHeader
                    title="Research Journey"
                    subtitle="The how and why behind the project — from raw signal to attributable impact."
                  />
                  <ResearchJourneySection />
                </section>
              )}

              {section === "abstract" && (
                <section className="space-y-4">
                  <SectionHeader
                    title="Scientific Abstract"
                    subtitle="Attributable impact of offshore natural gas operations on coastal tropospheric O₃."
                  />
                  <AbstractSection />
                </section>
              )}

              <footer className="flex flex-wrap items-center justify-between gap-2 border-t border-border pt-4 text-[11px] text-muted-foreground">
                <span>© 2026 Sharon-Carmel Municipal Environmental Association · Atmos Research Group</span>
                <span className="text-mono-num">Build v2.4.1 · Study Period 2017 — 2025</span>
              </footer>
            </main>
          </div>
        </div>
      </SidebarProvider>
    </StationProvider>
  );
};

function SectionHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div>
      <h2 className="font-display text-lg font-semibold">{title}</h2>
      <p className="text-xs text-muted-foreground">{subtitle}</p>
    </div>
  );
}

export default Index;
