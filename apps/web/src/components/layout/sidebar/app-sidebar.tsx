import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarRail } from '@/components/ui/sidebar'
import { AudioWaveform, Bot, Command, CompassIcon, Frame, GalleryVerticalEnd, Map, PieChart } from 'lucide-react'
import * as React from 'react'
import { NavMain } from './components/nav-main'
import { NavProjects } from './components/nav-projects'
import { NavUser } from './components/nav-user'

// This is sample data.
const data = {
  user: {
    name: 'shubham',
    email: 'sharmashubham6822@gmail.com',
    avatar: 'https://shubhamsharma-portfolio.vercel.app/r/images/avatar/avatar-shubham.png',
  },
  teams: [
    {
      name: 'Acme Inc',
      logo: GalleryVerticalEnd,
      plan: 'Enterprise',
    },
    {
      name: 'Acme Corp.',
      logo: AudioWaveform,
      plan: 'Startup',
    },
    {
      name: 'Evil Corp.',
      logo: Command,
      plan: 'Free',
    },
  ],
  navMain: [
    {
      title: 'Assistants',
      url: '#',
      icon: Bot,
      isActive: true,
      items: [
        {
          title: 'Agent',
          url: '/agent',
        },
        {
          title: 'Playground',
          url: '/playground',
        },
      ],
    }
  ],
  projects: [
    {
      name: 'Design Engineering',
      url: '#',
      icon: Frame,
    },
    {
      name: 'Sales & Marketing',
      url: '#',
      icon: PieChart,
    },
    {
      name: 'Travel',
      url: '#',
      icon: Map,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
         <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <CompassIcon className="!size-5" />
                <span className="text-base font-semibold">Eva AI</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
