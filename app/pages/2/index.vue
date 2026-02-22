<script lang="ts" setup>
  const headline = gameTypeToFullName('mhst2');

  definePageMeta({
    layout: false,
  });

  useSeoMeta({
    titleTemplate: '',
    title: 'Monster Buddy - Companion App For Monster Hunter Stories 2',
    description:
      'Includes monster attack types and weaknesses, egg patterns, monstie locations and retreat conditions',
  });
</script>

<template>
  <UContainer>
    <UPage>
      <UPageHeader
        title="Monster Buddy"
        description="Includes monster attack types and weaknesses, egg patterns, monstie locations and retreat conditions"
        :headline="headline"
      />

      <UPageBody>Content</UPageBody>
    </UPage>
  </UContainer>
</template>
