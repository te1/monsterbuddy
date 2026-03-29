<script lang="ts" setup>
  import type { Monster } from '~/services/3/types';

  const props = withDefaults(
    defineProps<{
      monster?: Monster;
      genus?: GenusType;
      eager?: boolean;
    }>(),
    {
      monster: undefined,
      genus: undefined,
      eager: false,
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
    <S3EggImage
      class="-mx-3 size-[120px]"
      :monster="monster"
      :genus="genus"
      :eager="eager"
      noTooltip
    />

    <div class="mb-2 font-semibold whitespace-nowrap" v-text="text" />
  </div>
</template>
