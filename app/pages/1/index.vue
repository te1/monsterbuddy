<script lang="ts" setup>
  const { title } = useAppConfig().seo;
  const headline = gameTypeToFullName('mhst1');

  definePageMeta({
    layout: false,
  });

  useSeoMeta({
    titleTemplate: '',
    title: `${title} - Companion App For Monster Hunter Stories 1`,
    description:
      'Includes monster attack types and weaknesses, egg patterns, monstie locations and retreat conditions',
  });
</script>

<template>
  <UContainer>
    <UPage>
      <UPageHeader
        :title="title"
        description="Includes monster attack types and weaknesses, egg patterns, monstie locations and retreat conditions"
        :headline="headline"
      />

      <UPageBody>Content</UPageBody>
    </UPage>
  </UContainer>
</template>
