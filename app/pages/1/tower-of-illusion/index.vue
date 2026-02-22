<script lang="ts" setup>
  const headline = gameTypeToFullName('mhst1');

  useSeoMeta({
    title: 'Tower of Illusion Monster List For Monster Hunter Stories 1 / Remastered',
    description:
      'Overview of all the high rank monsters and on which floor to find them in the Tower of Illusion end game zone',
  });
</script>

<template>
  <div>
    <UPageHeader
      title="Tower of Illusion"
      description="Overview of all the high rank monsters and on which floor to find them in the Tower of Illusion end game zone"
      :headline="headline"
    />

    <UPageBody>Content</UPageBody>
  </div>
</template>
