<script lang="ts" setup>
  const headline = gameTypeToFullName('mhst3');

  useSeoMeta({
    title: `Area List And Habitat Restoration Info For ${gameTypeToFullLabel('mhst3')}`,
    description:
      'Overview of areas and list of monsters you will find there including feral and invasive monsters and endangered species',
  });
</script>

<template>
  <div>
    <UPageHeader
      title="Areas & Habitat Restoration"
      description="Overview of areas and list of monsters you will find there including feral and invasive monsters and endangered species"
      :headline="headline"
    />

    <UPageBody>Content</UPageBody>
  </div>
</template>
