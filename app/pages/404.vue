<script lang="ts" setup>
  const { title } = useAppConfig().seo;

  definePageMeta({
    layout: false,
  });

  useSeoMeta({
    title: `Page Not Found`,
    description: 'We are sorry but there was an error with this page.',
    robots: 'noindex, follow',
  });
</script>

<template>
  <UError
    :error="{
      statusCode: 404,
      statusMessage: 'Page Not Found',
    }"
    :clear="{
      label: `Back to ${title}`,
      size: 'xl',
      color: 'neutral',
      variant: 'link',
      icon: 'ph:arrow-left',
      class: 'cursor-pointer',
    }"
  />
</template>
