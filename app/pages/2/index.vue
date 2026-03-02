<script lang="ts" setup>
  const { title } = useAppConfig().seo;
  const headline = gameTypeToFullName('mhst2');

  useSeoMeta({
    titleTemplate: '',
    title: `${title} - Companion App For ${gameTypeToFullLabel('mhst2')}`,
    description:
      'Includes monster attack types and weaknesses, egg patterns, monstie locations and retreat conditions',
  });

  defineOgImageComponent('Text', {
    // headline: headline,
  });
</script>

<template>
  <UContainer>
    <UPage>
      <UPageHeader
        :title="title"
        description="Monster Buddy is a companion app for Monster Hunter Stories 2: Wings of Ruin that can help you learn or remember information useful during combat and general gameplay. It's not a complete guide, walkthrough or advanced character / gene planner (yet)."
        :headline="headline"
      />

      <UPageBody>Content</UPageBody>
    </UPage>
  </UContainer>
</template>
