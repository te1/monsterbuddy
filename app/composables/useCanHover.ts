import { useMediaQuery } from '@vueuse/core';

export function useCanHover() {
  return useMediaQuery('(hover: hover) and (pointer: fine)');
}
