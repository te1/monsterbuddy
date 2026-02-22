<script lang="ts" setup>
  const headline = gameTypeToFullName('mhst1');

  useSeoMeta({
    title: 'Monstie List For Monster Hunter Stories 1 / Remastered',
    description:
      'Easily find all monsties in their natural habitats and check on retreat conditions, their attack types and stats',
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
