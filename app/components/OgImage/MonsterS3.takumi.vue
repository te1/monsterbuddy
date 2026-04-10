<script lang="ts" setup>
  import { formatMonsterInfoAll } from '~/services/3/presentation';
  import type { Monster } from '~/services/3/types';

  const props = withDefaults(
    defineProps<{
      monster: Monster;
      description?: string;
      genes?: boolean;
    }>(),
    {
      description: '',
      genes: false,
    }
  );

  const eggIcons = import.meta.glob('~/assets/3/egg/*.svg', {
    eager: true,
    import: 'default',
    query: '?inline',
  });

  const eggIcon = computed(() => eggIcons[`/assets/3/egg/${props.monster.name}.svg`] ?? undefined);
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
        {{ genes ? `${monster.name} Genes` : monster.name }}
      </h1>

      <p v-if="description" class="hidden text-5xl leading-tight text-primary lg:block">
        {{ description }}
      </p>
    </section>

    <section class="hidden items-center gap-12 lg:flex">
      <img :src="`/img/3/monster-icon-2x/${props.monster.name}.png`" class="size-[240px]" />

      <ul class="flex flex-col gap-6 text-5xl text-toned">
        <li class="text-dimmed">{{ formatMonsterInfoAll(monster) }}</li>
        <li>{{ monster.genus }}</li>
      </ul>
    </section>
  </div>

  <img
    v-if="eggIcon"
    :src="eggIcon"
    class="absolute right-[-300px] bottom-[-300px] size-[700px] -rotate-23 opacity-60"
  />
</template>
