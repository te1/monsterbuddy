<script lang="ts" setup>
  const headline = gameTypeToFullName('mhst2');

  useSeoMeta({
    title: 'Monstie List For Monster Hunter Stories 2',
  });
</script>

<template>
  <div>
    <UPageHeader
      title="Monsties"
      description="Easily find all monsties in their natural habitats and check on retreat conditions, their attack types and stats"
      :headline="headline"
    />

    <UPageBody>Content</UPageBody>
  </div>
</template>
