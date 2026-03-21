<script lang="ts" setup>
  const { title } = useAppConfig().seo;
  const headline = gameTypeToFullName('mhst3');

  useSeoMeta({
    titleTemplate: '',
    title: `${title} - Companion App For ${gameTypeToFullLabel('mhst3')}`,
    description: 'Includes monster attack types and weaknesses, egg patterns and monstie locations',
  });

  defineOgImage(
    'Title',
    {
      title,
      description: `Companion App For ${gameTypeToFullLabel('mhst3')}`,
      lines: ['Eggs', 'Monsters', 'Attack Patterns'],
      game: 'mhst3',
    },
    [{ key: 'og' }, { key: 'whatsapp', width: 800, height: 800 }]
  );
</script>

<template>
  <div>
    <UPageHeader
      :title="title"
      description="Monster Buddy is a companion app for Monster Hunter Stories 3: Twisted Reflection that can help you learn or remember information useful during combat and general gameplay. It's not a complete guide, walkthrough or advanced character / gene planner (yet)."
      :headline="headline"
    />

    <UPageBody>Content</UPageBody>
  </div>
</template>
