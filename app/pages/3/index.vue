<script lang="ts" setup>
  const { title } = useAppConfig().seo;
  const headline = gameTypeToFullName('mhst3');

  definePageMeta({
    layout: false,
  });

  useSeoMeta({
    titleTemplate: '',
    title: `${title} - Companion App For Monster Hunter Stories 3`,
    description: 'Includes monster attack types and weaknesses, egg patterns and monstie locations',
  });
</script>

<template>
  <UContainer>
    <UPage>
      <UPageHeader
        :title="title"
        description="Includes monster attack types and weaknesses, egg patterns and monstie locations"
        :headline="headline"
      />

      <UPageBody>Content</UPageBody>
    </UPage>
  </UContainer>
</template>
