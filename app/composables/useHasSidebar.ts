import { useMediaQuery } from '@vueuse/core';

export function useHasSidebar() {
  // Tailwind `lg` starts at 1024px, so the sidebar is available from there up
  return useMediaQuery('(min-width: 1024px)');
}
