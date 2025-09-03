'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider, useTheme } from 'next-themes';
import type { ThemeProviderProps } from 'next-themes/dist/types';

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

export function useAppTheme() {
  const { theme, setTheme, ...rest } = useTheme();

  React.useEffect(() => {
    const body = window.document.body;
    body.classList.remove('glass-bg', 'liquid-bg');
    
    if (theme === 'glass') {
      body.classList.add('glass-bg');
    } else if (theme === 'liquid-glass') {
      body.classList.add('liquid-bg');
    }
  }, [theme]);
  
  return { theme, setTheme, ...rest };
}
