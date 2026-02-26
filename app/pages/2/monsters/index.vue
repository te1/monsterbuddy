<script lang="ts" setup>
  useSeoMeta({
    title: `Monster List For ${gameTypeToFullLabel('mhst2')}`,
    description:
      'Quickly check for monster attack patterns, elemental weaknesses and weapon effectiveness on body parts',
  });

  const headline = gameTypeToFullName('mhst2');
</script>

<template>
  <div>
    <UPageHeader
      title="Monsters"
      description="Quickly check for monster attack patterns, elemental weaknesses and weapon effectiveness on body parts"
      :headline="headline"
    />

    <UPageBody>Content</UPageBody>
  </div>
</template>
