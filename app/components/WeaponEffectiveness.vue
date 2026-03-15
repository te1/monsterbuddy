<script lang="ts" setup>
  const props = defineProps<{
    types: WeaponType[];
  }>();

  const slashIneffective = computed(() => !props.types.includes('slash'));
  const bluntIneffective = computed(() => !props.types.includes('blunt'));
  const pierceIneffective = computed(() => !props.types.includes('pierce'));
</script>

<template>
  <div class="flex items-center">
    <WeaponTypeIcon type="slash" :ineffective="slashIneffective" class="size-8" />
    <WeaponTypeIcon type="pierce" :ineffective="pierceIneffective" class="size-8" />
    <WeaponTypeIcon type="blunt" :ineffective="bluntIneffective" class="size-8" />
  </div>
</template>
