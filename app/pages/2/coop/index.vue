<script lang="ts" setup>
  useSeoMeta({
    title: `Co-Op Quest List (Dens) For ${gameTypeToFullLabel('mhst2')}`,
    description: 'Overview of co-op missions and list of eggs you can find in the different dens',
  });

  const headline = gameTypeToFullName('mhst2');
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
