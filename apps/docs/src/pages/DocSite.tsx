import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/sidebar"
import MarkdownViewer from "@/components/mdDisplay"

const DocSite = () => {
  return (
    <SidebarProvider>
      <div className="flex w-full bg-background">
        <AppSidebar />
        <main className="flex-1 flex flex-col w-full">
            <div className="sticky top-0 z-10 bg-background border-b flex items-center gap-3 p-4">
            <SidebarTrigger className="p-2 bg-gray-800 text-white" />
            <div className="text-white text-lg font-bold">Microservices Chat App Documentation</div>
            </div>
          <div className="flex-1 w-full">
            <MarkdownViewer />
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}

export default DocSite