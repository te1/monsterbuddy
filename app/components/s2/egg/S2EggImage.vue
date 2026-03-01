<script lang="ts" setup>
  import type { Monster } from '~/services/2/types';
  import { getEggIconUrlForGenus, getEggIconUrlForMonster } from '~/services/2/assets';

  const props = withDefaults(
    defineProps<{
      monster?: Monster;
      genus?: GenusType;
      tooltipTop?: boolean;
    }>(),
    {
      monster: undefined,
      genus: undefined,
      tooltipTop: false,
    }
  );

  const imageUrl = computed(() => {
    if (props.genus) {
      return getEggIconUrlForGenus(props.genus);
    }
    return getEggIconUrlForMonster(props.monster);
  });

  const caption = computed(() => {
    if (props.genus) {
      return `${props.genus} egg`;
    }
    return `${props.monster?.name} egg`;
  });
</script>

<template>
  <UTooltip :text="caption" :content="{ side: tooltipTop ? 'top' : 'bottom' }">
    <img :src="imageUrl" :alt="caption" width="120" height="120" />
  </UTooltip>
</template>
