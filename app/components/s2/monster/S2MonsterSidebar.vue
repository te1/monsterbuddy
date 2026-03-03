<script lang="ts" setup>
  const items = [{ label: 'Filter' }];
</script>

<template>
  <UTabs
    color="neutral"
    variant="link"
    :items="items"
    :ui="{ list: 'gap-4', trigger: 'px-0 py-0' }"
  />
</template>
