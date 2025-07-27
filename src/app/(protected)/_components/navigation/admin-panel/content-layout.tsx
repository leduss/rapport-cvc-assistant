'use client';

import { Navbar } from './navbar';

interface ContentLayoutProps {
  children: React.ReactNode;
}

export function ContentLayout({ children }: ContentLayoutProps) {
  return (
    <div className="min-h-full w-full">
      <Navbar />
      <div className="container m-auto size-full p-2">{children}</div>
    </div>
  );
}
