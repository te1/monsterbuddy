<script lang="ts" setup>
  const items = computed(() => getNavItems(useRoute().path));
</script>

<template>
  <UNavigationMenu :items="items" variant="link" contentOrientation="vertical" />
</template>
