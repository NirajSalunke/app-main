import { ChevronsUpDown, GalleryVerticalEnd, Plus } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Project, useProject } from "@/hooks/useProject";
import { Drawer, DrawerContent, DrawerTrigger } from "./ui/drawer";
import { Button } from "./ui/button";

import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useUser } from "@clerk/clerk-react";

export function TeamSwitcher({ onChange }: { onChange: (e: Project) => void }) {
  const { isMobile } = useSidebar();
  const user = useUser();
  const [projName, setProjName] = useState("");
  const { activeAllProjects, activeProject } = useProject();
  const CreateProject = async () => {
    try {
      // console.log(projName);
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/newproject`,
        {
          Name: projName,
          Cache: false,
          Storage: false,
        },
        {
          headers: {
            clerkID: user.user?.id,
            secret_key: import.meta.env.VITE_SECRET_KEY,
          },
        }
      );
      toast("New Project Created! Switch to New Project");
      window.location.reload();
    } catch (error) {
      toast("Project Creation Failed");
      console.error(error);
    }
    console.log("created");
  };

  if (!activeProject || !activeAllProjects) {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <GalleryVerticalEnd className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    Create New Project
                  </span>
                </div>
                <ChevronsUpDown className="ml-auto" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
              align="start"
              side={isMobile ? "bottom" : "right"}
              sideOffset={4}
            >
              <DropdownMenuLabel className="text-xs text-muted-foreground">
                Projects
              </DropdownMenuLabel>

              <DropdownMenuSeparator />
              <DropdownMenuItem
                onSelect={(e) => {
                  e.preventDefault();
                  console.log("ijss");
                }}
                className="gap-2 p-2"
              >
                <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                  <Plus className="size-4" />
                </div>
                <Drawer>
                  <DrawerTrigger>
                    <Button variant="ghost">Create Project</Button>
                  </DrawerTrigger>
                  <DrawerContent>
                    <div className="p-10 flex">
                      <div className="w-1/2 h-[40vh] text-center flex gap-5 flex-col  justify-center items-center">
                        <h1 className="text-8xl ">New Project</h1>
                        <h6 className="text-lg   ">
                          Spinning up your next big idea...
                        </h6>
                      </div>
                      <div className="w-1/2 h-[40vh]  flex gap-5 flex-col  justify-center ">
                        <Label>Project Name : </Label>
                        <Input
                          value={projName}
                          onChange={(e) => setProjName(e.target.value)}
                          className="max-w-lg "
                          type="text"
                        />
                        <div className="w-[32rem] flex justify-center ">
                          <Button onClick={CreateProject} variant={"default"}>
                            Create
                          </Button>
                        </div>
                      </div>
                    </div>
                  </DrawerContent>
                </Drawer>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    );
  }
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <GalleryVerticalEnd className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {activeProject?.name}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Projects
            </DropdownMenuLabel>
            {activeAllProjects?.map((project) => (
              <DropdownMenuItem
                key={project.name}
                onClick={() => {
                  onChange(project);
                }}
                className="gap-2 p-2"
              >
                <div className="flex size-6 items-center justify-center rounded-sm border">
                  <GalleryVerticalEnd className="size-4 shrink-0" />
                </div>
                {project.name}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onSelect={(e) => e.preventDefault()}
              className="gap-2 p-2"
            >
              <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                <Plus className="size-4" />
              </div>
              <Drawer>
                <DrawerTrigger>
                  <Button variant="ghost">Create Project</Button>
                </DrawerTrigger>
                <DrawerContent>
                  <div className="p-10 flex">
                    <div className="w-1/2 h-[40vh] text-center flex gap-5 flex-col  justify-center items-center">
                      <h1 className="text-8xl ">New Project</h1>
                      <h6 className="text-lg   ">
                        Spinning up your next big idea...
                      </h6>
                    </div>
                    <div className="w-1/2 h-[40vh]  flex gap-5 flex-col  justify-center ">
                      <Label>Project Name : </Label>
                      <Input
                        value={projName}
                        onChange={(e) => setProjName(e.target.value)}
                        className="max-w-lg "
                        type="text"
                      />
                      <div className="w-[32rem] flex justify-center ">
                        <Button onClick={CreateProject} variant={"default"}>
                          Create
                        </Button>
                      </div>
                    </div>
                  </div>
                </DrawerContent>
              </Drawer>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
