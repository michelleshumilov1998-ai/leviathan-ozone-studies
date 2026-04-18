import { Activity, BarChart3, Compass, FlaskConical, LayoutDashboard, LineChart, Settings, Wind } from "lucide-react";
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

const nav = [
  { title: "Overview", icon: LayoutDashboard, key: "overview", active: true },
  { title: "Spatial Analysis", icon: Compass, key: "spatial" },
  { title: "Forecast vs Actual", icon: LineChart, key: "forecast" },
  { title: "Model Performance", icon: BarChart3, key: "models" },
  { title: "Wind Filtering", icon: Wind, key: "wind" },
  { title: "Methodology", icon: FlaskConical, key: "methodology" },
];

const system = [
  { title: "Live Monitor", icon: Activity, key: "monitor" },
  { title: "Settings", icon: Settings, key: "settings" },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border">
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex items-center gap-3 px-2 py-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-gradient-accent shadow-glow">
            <Wind className="h-5 w-5 text-accent-foreground" />
          </div>
          {!collapsed && (
            <div className="flex flex-col leading-tight">
              <span className="font-display text-sm font-bold text-sidebar-foreground">Atmos Research</span>
              <span className="text-[11px] text-sidebar-foreground/60">Ozone Impact Suite</span>
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
              {nav.map((item) => (
                <SidebarMenuItem key={item.key}>
                  <SidebarMenuButton
                    isActive={item.active}
                    tooltip={item.title}
                    className="data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground"
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
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
                <SidebarMenuItem key={item.key}>
                  <SidebarMenuButton tooltip={item.title} className="hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground">
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
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
              <p className="text-mono-num mt-0.5 text-xs text-sidebar-foreground">2019 — 2024</p>
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
