<script lang="ts" setup>
  import type { Monster } from '~/services/3/types';

  const props = withDefaults(
    defineProps<{
      monster: Monster;
      showEgg?: boolean;
      linkGenes?: boolean;
      removeable?: boolean;
    }>(),
    {
      showEgg: false,
      linkGenes: false,
      removeable: false,
    }
  );

  const emit = defineEmits<{
    remove: [];
  }>();

  const target = computed(() => {
    return props.linkGenes && props.monster.hatchable
      ? `/3/monsters/${props.monster.slug}/genes`
      : `/3/monsters/${props.monster.slug}`;
  });
</script>

<template>
  <div class="group relative">
    <NuxtLink
      :to="target"
      prefetchOn="interaction"
      class="flex max-w-max items-center gap-3 hover:text-default"
    >
      <div class="hidden size-9 xl:block">
        <S3EggImage v-if="showEgg" :monster="monster" noTooltip class="size-9" />
        <S3MonsterIcon v-else :monster="monster" noTooltip class="size-9" />
      </div>
      <div class="truncate" v-text="monster.name" />
    </NuxtLink>

    <UTooltip
      v-if="removeable"
      class="absolute top-1/2 right-0 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-75"
      text="Remove bookmark"
    >
      <UButton
        variant="soft"
        color="neutral"
        icon="ph:trash"
        aria-label="Remove bookmark"
        @click="emit('remove')"
      />
    </UTooltip>
  </div>
</template>
