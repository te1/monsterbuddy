<script lang="ts" setup>
  import type { Monster } from '~/services/3/types';
  import { getEggIconUrlForGenus, getEggIconUrlForMonster } from '~/services/3/assets';

  const props = withDefaults(
    defineProps<{
      monster?: Monster;
      genus?: GenusType;
      tooltipTop?: boolean;
      noTooltip?: boolean;
      eager?: boolean;
    }>(),
    {
      monster: undefined,
      genus: undefined,
      tooltipTop: false,
      noTooltip: false,
      eager: false,
    }
  );

  const imageUrl = shallowRef<string | null>(null);

  async function updateImageUrl() {
    imageUrl.value = props.genus
      ? await getEggIconUrlForGenus(props.genus)
      : await getEggIconUrlForMonster(props.monster);
  }

  await updateImageUrl();

  watch([() => props.genus, () => props.monster?.slug], updateImageUrl);

  const caption = computed(() => {
    if (props.genus) {
      return `${props.genus} egg`;
    }
    return `${props.monster?.name} egg`;
  });
</script>

<template>
  <UTooltip v-if="!noTooltip" :text="caption" :content="{ side: tooltipTop ? 'top' : 'bottom' }">
    <img
      :src="imageUrl"
      :alt="caption"
      width="120"
      height="120"
      :loading="eager ? 'eager' : 'lazy'"
      decoding="async"
    />
  </UTooltip>

  <img
    v-else
    :src="imageUrl"
    :alt="caption"
    width="120"
    height="120"
    :loading="eager ? 'eager' : 'lazy'"
    decoding="async"
  />
</template>
