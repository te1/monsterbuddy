<script lang="ts" setup>
  const headline = gameTypeToFullName('mhst2');

  useSeoMeta({
    title: `Elder's Lair Monster List For ${gameTypeToFullLabel('mhst2')}`,
    description:
      "Overview of all the high rank monsters and on which floor to find them in the Elder's Lair and Special Elder's Lair end game zones",
  });
</script>

<template>
  <div>
    <UPageHeader
      title="Elder's Lair"
      description="Overview of all the high rank monsters and on which floor to find them in the Elder's Lair and Special Elder's Lair end game zones"
      :headline="headline"
    />

    <UPageBody>Content</UPageBody>
  </div>
</template>
