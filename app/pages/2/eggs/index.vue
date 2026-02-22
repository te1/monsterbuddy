<script lang="ts" setup>
  const headline = gameTypeToFullName('mhst2');

  useSeoMeta({
    title: 'Egg List For Monster Hunter Stories 2',
  });
</script>

<template>
  <div>
    <UPageHeader
      title="Eggs"
      description="Visual guide with images for all egg patterns for every hatchable monstie"
      :headline="headline"
    />

    <UPageBody>Content</UPageBody>
  </div>
</template>
