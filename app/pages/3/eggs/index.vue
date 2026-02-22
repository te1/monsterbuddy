<script lang="ts" setup>
  const headline = gameTypeToFullName('mhst3');

  useSeoMeta({
    title: 'Egg List For Monster Hunter Stories 3',
    description:
      'Visual guide with images for all egg patterns for every hatchable monstie with search, sorting and filtering',
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
