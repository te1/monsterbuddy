<script lang="ts" setup>
  const headline = gameTypeToFullName('mhst2');

  useSeoMeta({
    title: 'Co-Op Quest List (Dens) For Monster Hunter Stories 2',
  });
</script>

<template>
  <div>
    <UPageHeader
      title="Co-Op Quests"
      description="Overview of co-op missions and list of eggs you can find in the different dens"
      :headline="headline"
    />

    <UPageBody>Content</UPageBody>
  </div>
</template>
