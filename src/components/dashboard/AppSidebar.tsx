import { Activity, BarChart3, BookOpen, Compass, FlaskConical, LayoutDashboard, LineChart, Route } from "lucide-react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import logo from "@/assets/sharon-carmel-logo.png";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

export type SectionId = "overview" | "spatial" | "forecast" | "models" | "methodology" | "abstract" | "journey";

const nav: { title: string; icon: typeof LayoutDashboard; section: SectionId }[] = [
  { title: "Overview", icon: LayoutDashboard, section: "overview" },
  { title: "Spatial Analysis", icon: Compass, section: "spatial" },
  { title: "Forecast vs Actual", icon: LineChart, section: "forecast" },
  { title: "Model Performance", icon: BarChart3, section: "models" },
  { title: "Methodology", icon: FlaskConical, section: "methodology" },
  { title: "Research Journey", icon: Route, section: "journey" },
  { title: "Abstract", icon: BookOpen, section: "abstract" },
];

const system = [
  { title: "Live Monitor", icon: Activity, url: "/live-monitor" },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const currentSection = (searchParams.get("section") as SectionId) || "overview";

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border">
      <SidebarHeader className="border-b border-sidebar-border py-1.5">
        <div className="flex items-center gap-2 px-2 py-1">
          <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/95 p-1 shadow-elev-sm ring-1 ring-border dark:bg-white/90">
            <img
              src={logo}
              alt="Sharon-Carmel Municipal Environmental Association logo"
              className="h-full w-full object-contain"
              loading="eager"
              decoding="async"
            />
          </div>
          {!collapsed && (
            <div className="flex min-w-0 flex-col leading-tight">
              <span className="font-display text-[13px] font-bold text-sidebar-foreground">
                Ozone Research Analytics
              </span>
              <span className="truncate text-[9px] text-sidebar-foreground/60">
                Sharon-Carmel Env. Assoc.
              </span>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="gap-0 overflow-hidden">
        <SidebarGroup className="py-1">
          <SidebarGroupLabel className="h-5 px-2 text-[10px] uppercase tracking-wider text-sidebar-foreground/50">
            Analysis
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-0.5">
              {nav.map((item) => {
                const active = location.pathname === "/" && currentSection === item.section;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={active}
                      tooltip={item.title}
                      size="sm"
                      className="h-7 text-[12px] data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground"
                    >
                      <Link to={item.section === "overview" ? "/" : `/?section=${item.section}`}>
                        <item.icon className="h-3.5 w-3.5" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="py-1">
          <SidebarGroupLabel className="h-5 px-2 text-[10px] uppercase tracking-wider text-sidebar-foreground/50">
            System
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-0.5">
              {system.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={location.pathname === item.url}
                    tooltip={item.title}
                    size="sm"
                    className="h-7 text-[12px] data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground"
                  >
                    <Link to={item.url}>
                      <item.icon className="h-3.5 w-3.5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border py-1">
        {!collapsed ? (
          <div className="space-y-1 px-2 py-0.5">
            <div className="flex items-center justify-between rounded-md bg-sidebar-accent/40 px-2 py-1">
              <div className="min-w-0 leading-tight">
                <p className="text-[8px] uppercase tracking-wider text-sidebar-foreground/60">
                  Study Period
                </p>
                <p className="text-mono-num text-[10px] font-semibold text-sidebar-foreground">
                  2017 — 2025
                </p>
              </div>
              <span className="h-1.5 w-1.5 shrink-0 animate-pulse-soft rounded-full bg-success" />
            </div>
            <div className="rounded-md border border-sidebar-border/60 bg-sidebar-accent/20 px-2 py-1 leading-tight">
              <p className="font-display text-[11px] font-semibold text-sidebar-foreground">
                Michelle Shumilov
              </p>
              <p className="text-[8px] text-sidebar-foreground/65">
                CS · Excellence · GPA 94
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-1 py-1">
            <span className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-success" />
            <span
              title="Michelle Shumilov · CS Student"
              className="flex h-6 w-6 items-center justify-center rounded-full bg-sidebar-accent/60 text-[9px] font-bold text-sidebar-foreground"
            >
              MS
            </span>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
