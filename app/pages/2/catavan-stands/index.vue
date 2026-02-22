<script lang="ts" setup>
  const headline = gameTypeToFullName('mhst2');

  useSeoMeta({
    title: 'Catavan Stand Fast Travel List For Monster Hunter Stories 2',
  });
</script>

<template>
  <div>
    <UPageHeader
      title="Catavan Stands"
      description="Overview of catavan stand fast travel locations and list of monsters you will find there"
      :headline="headline"
    />

    <UPageBody>Content</UPageBody>
  </div>
</template>
