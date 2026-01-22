/**
 * useAppTheme - Theme Management Hook
 * @module hooks/useAppTheme
 *
 * Handles theme persistence and DOM updates.
 */

import { useEffect } from 'react';
import { useAppStore } from '../store/useAppStore';
import type { Theme } from '../types';

interface UseAppThemeReturn {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  isDark: boolean;
}

/**
 * Hook for managing application theme
 *
 * @example
 * ```tsx
 * const { theme, toggleTheme, isDark } = useAppTheme();
 * ```
 */
export const useAppTheme = (): UseAppThemeReturn => {
  const theme = useAppStore((state) => state.theme);
  const toggleTheme = useAppStore((state) => state.toggleTheme);

  // Apply theme to DOM
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);

    // Update meta theme-color for mobile browsers
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute(
        'content',
        theme === 'dark' ? '#0a1f0a' : '#f0fdf4'
      );
    }
  }, [theme]);

  const setTheme = (newTheme: Theme) => {
    if (newTheme !== theme) {
      toggleTheme();
    }
  };

  return {
    theme,
    toggleTheme,
    setTheme,
    isDark: theme === 'dark',
  };
};

export default useAppTheme;
