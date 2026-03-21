<script lang="ts" setup>
  import { formatMonsterInfo } from '~/services/2/presentation';
  import type { Monster } from '~/services/2/types';

  const props = withDefaults(
    defineProps<{
      monster: Monster;
      description?: string;
    }>(),
    {
      description: '',
    }
  );

  const eggIcons = import.meta.glob('~/assets/2/egg/*.svg', {
    eager: true,
    import: 'default',
  });

  const monsterIcons = import.meta.glob('~/assets/2/monster-icon/*.png', {
    eager: true,
    import: 'default',
  });

  const eggIcon = computed(() => eggIcons[`/assets/2/egg/${props.monster.name}.svg`] ?? undefined);

  const monsterIcon = computed(
    () => monsterIcons[`/assets/2/monster-icon/${props.monster.name}.png`] ?? undefined
  );
</script>

<template>
  <div
    class="flex size-full flex-col justify-between bg-default px-20 py-30 text-default lg:pt-20 lg:pb-10"
    :style="{
      backgroundImage: 'linear-gradient(to top left, oklch(14.8% 0.004 228.8), transparent)',
    }"
  >
    <section class="flex flex-col gap-6 font-medium text-pretty lg:gap-3">
      <h1 class="text-[110px] leading-tight lg:text-[80px]">
        {{ monster.name }}
      </h1>

      <p v-if="description" class="hidden text-5xl leading-tight text-primary lg:block">
        {{ description }}
      </p>
    </section>

    <section class="hidden items-center gap-12 lg:flex">
      <img v-if="monsterIcon" :src="monsterIcon" class="size-[240px]" />

      <ul class="flex flex-col gap-6 text-5xl text-toned">
        <li class="text-dimmed">{{ formatMonsterInfo(monster) }}</li>
        <li>{{ monster.genus }}</li>
        <li>{{ monster.habitat }}</li>
      </ul>
    </section>
  </div>

  <img
    v-if="eggIcon"
    :src="eggIcon"
    class="absolute right-[-300px] bottom-[-300px] size-[700px] -rotate-23 opacity-60"
  />
</template>
