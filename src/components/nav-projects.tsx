import { type LucideIcon } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useDash } from "@/hooks/useDash";

export function NavProjects({
  projects,
}: {
  projects: {
    name: string;

    icon: LucideIcon;
  }[];
}) {
  const { setActiveTab } = useDash();
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Services</SidebarGroupLabel>
      <SidebarMenu>
        {projects.map((item, index) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton
              className="cursor-pointer"
              onClick={() => setActiveTab(index + 1)}
              asChild
            >
              <div>
                <item.icon />
                <span>{item.name}</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
