'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { TooltipProvider } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

import { SidebarProvider } from '../../../../../components/ui/sidebar';
import { AppSidebar } from '../app-sidebar';

export default function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider delayDuration={0}>
        <SidebarProvider>
          <AppSidebar />
          <main
            className={cn(
              'min-h-[calc(100vh)] w-full bg-zinc-50 dark:bg-zinc-900 transition-[margin-left] ease-in-out duration-300'
            )}
          >
            {children}
          </main>
        </SidebarProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
