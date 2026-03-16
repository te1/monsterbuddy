<script lang="ts" setup>
  import type { Monster } from '~/services/2/types';

  const props = withDefaults(
    defineProps<{
      monster?: Monster;
      genus?: GenusType;
    }>(),
    {
      monster: undefined,
      genus: undefined,
    }
  );

  const text = computed(() => {
    if (props.genus) {
      return props.genus;
    }
    return props.monster?.name;
  });
</script>

<template>
  <div class="flex h-[150px] flex-col items-center">
    <S2EggImage class="-mx-3 size-[120px]" :monster="monster" :genus="genus" noTooltip />

    <div class="mb-2 font-medium whitespace-nowrap" v-text="text" />
  </div>
</template>
