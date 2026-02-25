<script lang="ts" setup>
  useSeoMeta({
    title: 'Riding Actions In Monster Hunter Stories 2',
    description: 'Overview of all riding actions and list of monsties that can learn them',
  });

  const headline = gameTypeToFullName('mhst2');
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
