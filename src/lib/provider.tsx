'use client';
import { type PropsWithChildren } from 'react';
import React from 'react';

import { ThemeProvider } from 'next-themes';

export const Providers = ({ children }: PropsWithChildren) => {
  return (
    <>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        {children}
      </ThemeProvider>
    </>
  );
};
