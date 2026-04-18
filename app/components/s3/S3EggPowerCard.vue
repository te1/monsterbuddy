<script lang="ts" setup>
  import type { EggPower, EggPowerVariant } from '~/services/3/types';

  const props = defineProps<{
    eggPower: EggPower;
    variant: EggPowerVariant;
  }>();

  const info = computed(() => {
    switch (props.variant.size) {
      case '-':
        return 'Regular';

      case '+':
        return 'Awakened';

      default:
        return '?';
    }
  });
</script>

<template>
  <section class="flex flex-col gap-3">
    <div class="flex justify-between gap-2">
      <div>
        <h3 class="sr-only">General Egg Power Info</h3>

        <div class="-mb-1 text-muted" v-text="info" />

        <div class="mb-1 text-2xl font-medium" v-text="variant.name" />

        <div v-text="variant.description" />
      </div>

      <S3EggPowerIcon
        class="-mr-2 shrink-0"
        :eggPower="eggPower"
        :awakened="variant.size === '+'"
        big
        contrast
      />
    </div>

    <!--
    <div v-if="gene.details && gene.details.length > 0" class="@container">
      <div class="text-lg font-semibold">Characteristics</div>

      <div class="grid @md:grid-cols-2 @md:gap-x-12 @3xl:grid-cols-3">
        <template v-if="gene.details && gene.details.length > 0">
          <S3SkillDetail v-for="detail in gene.details" :key="detail.type" :detail="detail" />
        </template>
      </div>
    </div>
    -->
  </section>
</template>
