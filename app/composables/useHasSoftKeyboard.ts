import { useMediaQuery } from '@vueuse/core';

export function useHasSoftKeyboard() {
  const hasCoarsePointer = useMediaQuery('(any-pointer: coarse), (pointer: coarse)');
  const hasTouchScreen = ref(false);

  onMounted(() => {
    hasTouchScreen.value = navigator.maxTouchPoints > 0;
  });

  return computed(() => hasCoarsePointer.value || hasTouchScreen.value);
}
