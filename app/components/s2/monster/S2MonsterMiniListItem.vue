<script lang="ts" setup>
  import type { Monster } from '~/services/2/types';

  withDefaults(
    defineProps<{
      monster: Monster;
      showEgg?: boolean;
      removeable?: boolean;
    }>(),
    {
      showEgg: false,
      removeable: false,
    }
  );

  const emit = defineEmits<{
    remove: [];
  }>();
</script>

<template>
  <div class="group relative">
    <NuxtLink
      :to="`/2/monsters/${monster.slug}`"
      prefetchOn="interaction"
      class="flex max-w-max items-center gap-3 hover:text-default"
    >
      <div class="hidden size-9 xl:block">
        <S2EggImage v-if="showEgg" :monster="monster" noTooltip class="size-9" />
        <S2MonsterIcon v-else :monster="monster" noTooltip class="size-9" />
      </div>
      <div class="truncate" v-text="monster.name" />
    </NuxtLink>

    <UTooltip
      v-if="removeable"
      class="absolute top-1/2 right-0 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-75"
      text="Remove bookmark"
    >
      <UButton variant="soft" color="neutral" icon="ph:trash" @click="emit('remove')" />
    </UTooltip>
  </div>
</template>
