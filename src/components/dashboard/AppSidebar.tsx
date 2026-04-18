import { Activity, BarChart3, BookOpen, Compass, FlaskConical, LayoutDashboard, Leaf, LineChart } from "lucide-react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
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

export type SectionId = "overview" | "spatial" | "forecast" | "models" | "methodology" | "abstract";

const nav: { title: string; icon: typeof LayoutDashboard; section: SectionId }[] = [
  { title: "Overview", icon: LayoutDashboard, section: "overview" },
  { title: "Spatial Analysis", icon: Compass, section: "spatial" },
  { title: "Forecast vs Actual", icon: LineChart, section: "forecast" },
  { title: "Model Performance", icon: BarChart3, section: "models" },
  { title: "Methodology", icon: FlaskConical, section: "methodology" },
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
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex items-center gap-3 px-2 py-3">
          <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-accent shadow-glow">
            <Leaf className="h-5 w-5 text-accent-foreground" strokeWidth={2.25} />
            <span className="absolute -bottom-0.5 -right-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-sidebar text-[8px] font-bold text-sidebar-foreground ring-2 ring-sidebar">
              SC
            </span>
          </div>
          {!collapsed && (
            <div className="flex min-w-0 flex-col leading-tight">
              <span className="font-display text-sm font-bold text-sidebar-foreground">Atmos Research</span>
              <span className="truncate text-[10px] text-sidebar-foreground/60">
                Sharon-Carmel Municipal Env. Assoc.
              </span>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/50 text-[11px] uppercase tracking-wider">
            Analysis
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {nav.map((item) => {
                const active = location.pathname === "/" && currentSection === item.section;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={active}
                      tooltip={item.title}
                      className="data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground"
                    >
                      <Link to={item.section === "overview" ? "/" : `/?section=${item.section}`}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/50 text-[11px] uppercase tracking-wider">
            System
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {system.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={location.pathname === item.url}
                    tooltip={item.title}
                    className="data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground"
                  >
                    <Link to={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border">
        {!collapsed ? (
          <div className="px-2 py-3">
            <div className="rounded-md bg-sidebar-accent/40 p-3">
              <p className="text-[11px] font-medium text-sidebar-foreground/80">Study Period</p>
              <p className="text-mono-num mt-0.5 text-xs text-sidebar-foreground">2017 — 2025</p>
              <div className="mt-2 flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-success" />
                <span className="text-[10px] text-sidebar-foreground/60">Dataset synchronized</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-center py-3">
            <span className="h-2 w-2 animate-pulse-soft rounded-full bg-success" />
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
