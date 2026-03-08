<script lang="ts" setup>
  import { getWeaponTypeIconUrl } from '~/services/assets';

  const props = withDefaults(
    defineProps<{
      type: WeaponType;
      ineffective?: boolean;
    }>(),
    {
      ineffective: false,
    }
  );

  const imageUrl = computed(() => getWeaponTypeIconUrl(props.type, props.ineffective));

  const caption = computed(() => {
    let result = formatWeaponType(props.type);

    if (props.ineffective) {
      result += ' (ineffective)';
    }

    return result;
  });
</script>

<template>
  <UTooltip :text="caption" :content="{ side: 'top' }">
    <img
      :src="imageUrl"
      :alt="caption"
      width="60"
      height="60"
      :class="{ 'opacity-75': ineffective }"
    />
  </UTooltip>
</template>
