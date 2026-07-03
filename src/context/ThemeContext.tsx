import { createContext, useContext, useMemo, useState } from 'react';
import type { ReactNode } from 'react';

type ThemeMode = 'light' | 'dark';

type AppColors = {
  background: string;
  card: string;
  cardSoft: string;
  text: string;
  mutedText: string;
  border: string;
  primary: string;
  primarySoft: string;
  danger: string;
  dangerSoft: string;
  success: string;
  inputBackground: string;
};

type ThemeContextValue = {
  themeMode: ThemeMode;
  isDarkMode: boolean;
  colors: AppColors;
  toggleTheme: () => void;
};

const lightColors: AppColors = {
  background: '#eff6ff',
  card: '#ffffff',
  cardSoft: '#f9fafb',
  text: '#111827',
  mutedText: '#6b7280',
  border: '#d1d5db',
  primary: '#2563eb',
  primarySoft: '#eff6ff',
  danger: '#dc2626',
  dangerSoft: '#fee2e2',
  success: '#16a34a',
  inputBackground: '#ffffff',
};

const darkColors: AppColors = {
  background: '#0f172a',
  card: '#1e293b',
  cardSoft: '#334155',
  text: '#f8fafc',
  mutedText: '#cbd5e1',
  border: '#475569',
  primary: '#60a5fa',
  primarySoft: '#1e3a8a',
  danger: '#f87171',
  dangerSoft: '#7f1d1d',
  success: '#4ade80',
  inputBackground: '#1e293b',
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

type ThemeProviderProps = {
  children: ReactNode;
};

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [themeMode, setThemeMode] = useState<ThemeMode>('light');

  function toggleTheme() {
    setThemeMode((currentMode) => (currentMode === 'light' ? 'dark' : 'light'));
  }

  const colors = themeMode === 'light' ? lightColors : darkColors;

  const value = useMemo(
    () => ({
      themeMode,
      isDarkMode: themeMode === 'dark',
      colors,
      toggleTheme,
    }),
    [themeMode, colors]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useAppTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useAppTheme must be used inside ThemeProvider.');
  }

  return context;
}