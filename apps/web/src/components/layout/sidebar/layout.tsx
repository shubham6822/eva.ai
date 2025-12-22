import { AppSidebar } from '@/components/layout/sidebar/app-sidebar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="p-2 px-4">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  )
}
