<script lang="ts" setup>
  const headline = gameTypeToFullName('mhst1');

  useSeoMeta({
    title: 'Monster List For Monster Hunter Stories 1 / Remastered',
    description:
      'Quickly check for monster attack patterns, elemental weaknesses and weapon effectiveness on body parts',
  });
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
