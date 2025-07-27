'use client';

import * as React from 'react';

import { NavMain } from '@/app/(protected)/_components/navigation/nav-main';
import { NavProjects } from '@/app/(protected)/_components/navigation/nav-projects';
import { NavUser } from '@/app/(protected)/_components/navigation/nav-user';
import { TeamSwitcher } from '@/app/(protected)/_components/navigation/team-switcher';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';
import { sidebarData } from '@/lib/sidebar-data';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={sidebarData.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={sidebarData.navMain} />
        <NavProjects projects={sidebarData.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={sidebarData.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
