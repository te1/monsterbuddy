<script lang="ts" setup>
  const headline = gameTypeToFullName('mhst3');

  useSeoMeta({
    title: `Monstie List For ${gameTypeToFullLabel('mhst3')}`,
    description:
      'Easily find all monsties in their natural habitats and check on their attack types and stats',
  });
</script>

<template>
  <div>
    <UPageHeader
      title="Monsties"
      description="Easily find all monsties in their natural habitats and check on their attack types and stats"
      :headline="headline"
    />

    <UPageBody>Content</UPageBody>
  </div>
</template>
