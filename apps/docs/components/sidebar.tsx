import { Home, Database, Boxes, Cpu, Bell, Github,  FileText, HardDrive, Terminal } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";

const introItem = [
  {
    title: "Introduction",
    url: "/docs/intro/intro",
    icon: Home,
  },
  {
    title: "Architecture",
    url: "/docs/intro/arch",
    icon: Cpu,  
  },
  {
    title: "Local Setup",
    url: "/docs/intro/local",
    icon: HardDrive, 
  },
];

const builddeployItem = [
  {
    title: "CI pipeline",
    url: "/docs/build-deploy/ci",
    icon: Github,  
  },
  {
    title: "Kubernetes",
    url: "/docs/build-deploy/k8s",
    icon: Boxes,  
  },
];

const apiItem = [
  {
    title: "Schemas",
    url: "/docs/api/schemas",
    icon: Database,
  },
  {
    title: "Auth Service",
    url: "/docs/api/auth",
    icon: Home,
  },
  {
    title: "DB Service",
    url: "/docs/api/db",
    icon: Database,
  },
  {
    title: "Notification Service",
    url: "/docs/api/notification",
    icon: Bell, 
  },
  {
    title: "File Service",
    url: "/docs/api/file",
    icon: FileText,  
  },
  {
    title: "Socket Service",
    url: "/docs/api/socket",
    icon: Terminal, 
  },
];


export function AppSidebar() {
  return (
    <Sidebar className="border-r">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="px-4 py-2 text-lg font-semibold">
            Introduction
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {introItem.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <div className="flex items-center gap-3 px-4 py-2 hover:bg-accent rounded-lg mx-2">
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </div>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel className="px-4 py-2 text-lg font-semibold">
            Build & Deploy
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {builddeployItem.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <div className="flex items-center gap-3 px-4 py-2 hover:bg-accent rounded-lg mx-2">
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </div>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel className="px-4 py-2 text-lg font-semibold">
            Services Spec Docs
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {apiItem.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <div className="flex items-center gap-3 px-4 py-2 hover:bg-accent rounded-lg mx-2">
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </div>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
