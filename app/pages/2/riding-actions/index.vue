<script lang="ts" setup>
  const headline = gameTypeToFullName('mhst2');

  useSeoMeta({
    title: 'Riding Actions In Monster Hunter Stories 2',
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
