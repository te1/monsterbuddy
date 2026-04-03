<script lang="ts" setup>
  import type { Gene } from '~/services/3/types';
  import { createReusableTemplate } from '@vueuse/core';

  import sizeS from '~/assets/3/gene/size-s.avif';
  import sizeM from '~/assets/3/gene/size-m.avif';
  import sizeL from '~/assets/3/gene/size-l.avif';
  import sizeXL from '~/assets/3/gene/size-xl.avif';

  import elementDragon from '~/assets/3/gene/element-dragon.avif';
  import elementFire from '~/assets/3/gene/element-fire.avif';
  import elementIce from '~/assets/3/gene/element-ice.avif';
  import elementNone from '~/assets/3/gene/element-none.avif';
  import elementThunder from '~/assets/3/gene/element-thunder.avif';
  import elementWater from '~/assets/3/gene/element-water.avif';
  import rainbow from '~/assets/3/gene/rainbow.avif';

  import typePower from '~/assets/3/gene/type-power.svg';
  import typeTechnical from '~/assets/3/gene/type-technical.svg';
  import typeSpeed from '~/assets/3/gene/type-speed.svg';

  import rankS from '~/assets/3/gene/rank-s.avif';

  const props = withDefaults(
    defineProps<{
      gene: Gene;
      noTooltip?: boolean;
      size?: string;
    }>(),
    {
      noTooltip: false,
      size: 'size-14',
    }
  );

  const [DefineIconTemplate, ReuseIconTemplate] = createReusableTemplate();

  const elementSrc = computed(() => {
    switch (props.gene.element) {
      case 'dragon':
        return elementDragon;

      case 'fire':
        return elementFire;

      case 'ice':
        return elementIce;

      case 'none':
        return elementNone;

      case 'thunder':
        return elementThunder;

      case 'water':
        return elementWater;

      case 'all':
        return rainbow;

      default:
        return undefined;
    }
  });

  const typeSrc = computed(() => {
    switch (props.gene.type) {
      case 'power':
        return typePower;

      case 'technical':
        return typeTechnical;

      case 'speed':
        return typeSpeed;

      default:
        return undefined;
    }
  });

  const sizeSrc = computed(() => {
    switch (props.gene.size) {
      case 'S':
        return sizeS;

      case 'M':
        return sizeM;

      case 'L':
        return sizeL;

      case 'XL':
        return sizeXL;

      default:
        return sizeS;
    }
  });
</script>

<template>
  <DefineIconTemplate>
    <div class="relative" :class="size" v-bind="$attrs">
      <img v-if="sizeSrc" :src="sizeSrc" :alt="gene.size" class="absolute inset-0" />
      <img v-if="elementSrc" :src="elementSrc" :alt="gene.element" class="absolute inset-0" />
      <img
        v-if="typeSrc"
        :src="typeSrc"
        :alt="gene.type"
        class="absolute inset-1.75 drop-shadow-sm drop-shadow-black"
      />
      <img v-if="gene.sRank" :src="rankS" alt="S" class="absolute inset-0" />
    </div>
  </DefineIconTemplate>

  <UTooltip v-if="!noTooltip" :text="gene.name">
    <ReuseIconTemplate />
  </UTooltip>

  <ReuseIconTemplate v-else />
</template>
