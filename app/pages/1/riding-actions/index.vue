<script lang="ts" setup>
  const headline = gameTypeToFullName('mhst1');

  useSeoMeta({
    title: ' Riding Actions In Monster Hunter Stories 1 / Remastered',
    description: 'Overview of all riding actions and list of monsties that can learn them',
  });
</script>

<template>
  <div>
    <UPageHeader
      title="Riding Actions"
      description="Overview of all riding actions and list of monsties that can learn them"
      :headline="headline"
    />

    <UPageBody>Content</UPageBody>
  </div>
</template>
