import { useMediaQuery } from '@vueuse/core';

export function useHasWiderNav() {
  // Tailwind `sm` starts at 448px, so the wider nav is available from there up
  return useMediaQuery('(min-width: 448px)');
}
