<script lang="ts" setup>
  import type { Gene } from '~/services/3/types';
  import { formatGeneElement, formatGeneType } from '~/services/3/presentation';

  const props = withDefaults(
    defineProps<{
      gene: Gene;
      description?: string;
    }>(),
    {
      description: '',
    }
  );

  const info = computed(() => {
    const result: string[] = [];

    if (props.gene.element != null) {
      result.push(formatGeneElement(props.gene.element));
    }

    if (props.gene.type != null && props.gene.type !== 'all') {
      result.push(formatGeneType(props.gene.type));
    }

    return result.join(', ');
  });

  const caption = computed(() => {
    if (props.gene.active) {
      return 'Active Gene';
    }
    return 'Passive Gene';
  });

  const elementSrc = computed(() => {
    switch (props.gene.element) {
      case 'dragon':
        return '/img/3/gene/element-dragon.webp';

      case 'fire':
        return '/img/3/gene/element-fire.webp';

      case 'ice':
        return '/img/3/gene/element-ice.webp';

      case 'none':
        return '/img/3/gene/element-none.webp';

      case 'thunder':
        return '/img/3/gene/element-thunder.webp';

      case 'water':
        return '/img/3/gene/element-water.webp';

      case 'all':
        return '/img/3/gene/rainbow.webp';

      default:
        return undefined;
    }
  });

  const typeSrc = computed(() => {
    switch (props.gene.type) {
      case 'power':
        return '/img/3/gene/type-power.svg';

      case 'technical':
        return '/img/3/gene/type-technical.svg';

      case 'speed':
        return '/img/3/gene/type-speed.svg';

      default:
        return undefined;
    }
  });

  const sizeSrc = computed(() => {
    switch (props.gene.size) {
      case 'S':
        return '/img/3/gene/size-s.webp';

      case 'M':
        return '/img/3/gene/size-m.webp';

      case 'L':
        return '/img/3/gene/size-l.webp';

      case 'XL':
        return '/img/3/gene/size-xl.webp';

      default:
        return '/img/3/gene/size-s.webp';
    }
  });
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
        {{ gene.name }}
      </h1>

      <p v-if="description" class="hidden text-5xl leading-tight text-primary lg:block">
        {{ description }}
      </p>
    </section>

    <section class="hidden items-center gap-12 lg:flex">
      <div class="relative size-[240px]">
        <img v-if="sizeSrc" :src="sizeSrc" class="absolute inset-0" />
        <img v-if="elementSrc" :src="elementSrc" class="absolute inset-0" />
        <img v-if="typeSrc" :src="typeSrc" class="absolute inset-6" />
        <img v-if="gene.size === '+'" src="/img/3/gene/rank-s.webp" class="absolute inset-0" />
      </div>

      <ul class="flex flex-col gap-6 text-5xl text-toned">
        <li class="text-dimmed">{{ info }}</li>
        <li>{{ caption }}</li>
      </ul>
    </section>
  </div>

  <img
    src="/img/3/monsterbuddy.png"
    alt="Icon"
    class="absolute right-[-300px] bottom-[-300px] size-[700px] -rotate-23 opacity-60"
  />
</template>
