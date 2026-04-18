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

    <div v-if="variant.details && variant.details.length > 0" class="@container">
      <div class="text-lg font-semibold">Characteristics</div>

      <div class="grid @md:grid-cols-2 @md:gap-x-12 @3xl:grid-cols-3">
        <S3EggPowerDetail v-for="detail in variant.details" :key="detail.type" :detail="detail" />
      </div>
    </div>

    <div v-if="variant.requirements && variant.requirements.length > 0" class="@container">
      <div class="text-lg font-semibold">Gene Requirements</div>

      <div class="mb-1">
        This stronger effect will only be available if you have genes that match these requirements.
      </div>

      <div class="grid gap-y-1 @md:grid-cols-2 @md:gap-x-12 @3xl:grid-cols-3">
        <S3EggPowerRequirement
          v-for="(requirement, index) in variant.requirements"
          :key="index"
          :requirement="requirement"
        />
      </div>
    </div>
  </section>
</template>
