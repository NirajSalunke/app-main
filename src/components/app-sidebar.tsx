import {
  CloudUpload,
  Code,
  DatabaseIcon,
  FastForwardIcon,
  PieChart,
  SquareTerminal,
} from "lucide-react";

import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useUser } from "@clerk/clerk-react";
import { Project, useProject } from "@/hooks/useProject";
import { NavMain } from "./nav-main";
import { useDash } from "@/hooks/useDash";
const data = {
  navMain: [
    {
      title: "Initialisation",
      icon: Code,
    },
    {
      title: "Storage",
      isActive: true,
      icon: DatabaseIcon,
      items: [
        {
          title: "File Uploading",
        },
        {
          title: "File Retriving",
        },
      ],
    },
    {
      title: "Cache",
      icon: FastForwardIcon,
      items: [
        {
          title: "Set Key-Value Pair",
        },
        {
          title: "Retrieve Key-Value Pair",
        },
      ],
    },
  ],
  projects: [
    {
      name: "API Key",
      icon: SquareTerminal,
    },
    {
      name: "Storage",
      icon: DatabaseIcon,
    },
    {
      name: "Cache",
      icon: PieChart,
    },
    {
      name: "Host",
      icon: CloudUpload,
    },
  ],
};
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const userMain = useUser();
  const { setActiveTab } = useDash();
  const { setActiveProject } = useProject();
  const handleChange = (e: Project) => {
    setActiveProject(e);
    setActiveTab(5);
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher onChange={handleChange} />
      </SidebarHeader>
      <SidebarContent>
        <NavProjects projects={data.projects} />
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={{
            name: userMain.user?.firstName || "",
            email: userMain.user?.emailAddresses[0].emailAddress || "",
            avatar: userMain.user?.imageUrl || "",
          }}
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
