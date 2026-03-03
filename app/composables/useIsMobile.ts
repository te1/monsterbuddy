import { useMediaQuery } from '@vueuse/core';

export function useIsMobile() {
  // Tailwind `sm` starts at 640px, so mobile is anything below it
  return useMediaQuery('(max-width: 639px)');
}
