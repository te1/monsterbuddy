import { useMediaQuery } from '@vueuse/core';

export function useHasSoftKeyboard() {
  return useMediaQuery('(hover: none) and (pointer: coarse)');
}
