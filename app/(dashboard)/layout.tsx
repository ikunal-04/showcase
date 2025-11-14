import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex justify-between h-16 shrink-0 items-center gap-2 border-b px-4">
          <div>
            <SidebarTrigger className="-ml-1" />
          </div>

          <div>
            <Button asChild>
              <Link href="https://cliff-lipstick-643.notion.site/2ab137c6bc13802fa5a3e44f8092b8e2?pvs=105">
                Contact Us!
              </Link>
            </Button>
          </div>
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}
