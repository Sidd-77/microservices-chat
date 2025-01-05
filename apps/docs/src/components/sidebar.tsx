import { Calendar, Home, Search } from "lucide-react";
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

const apiItem = [
  {
    title: "Auth Service",
    url: "/docs/api/auth",
    icon: Home,
  },
  {
    title: "DB Service",
    url: "/docs/api/db",
    icon: Search,
  },
  {
    title: "Notification Service",
    url: "/docs/api/notification",
    icon: Calendar,
  },
  {
    title: "File Service",
    url: "/docs/api/file",
    icon: Calendar,
  },
  {
    title: "Socket Service",
    url: "/docs/api/socket",
    icon: Calendar,
  }
];

export function AppSidebar() {
  return (
    <Sidebar className="border-r">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="px-4 py-2 text-lg font-semibold">
            Api Docs
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {apiItem.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a 
                      href={item.url}
                      className="flex items-center gap-3 px-4 py-2 hover:bg-accent rounded-lg mx-2"
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </a>
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