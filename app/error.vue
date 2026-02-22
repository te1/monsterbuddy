<script lang="ts" setup>
  import type { NuxtError } from '#app';

  const { title } = useAppConfig().seo;
  const description = 'We are sorry but there was an error with this page.';

  defineProps<{
    error: NuxtError;
  }>();

  useHead({
    meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1' }],
    link: [{ rel: 'icon', href: '/favicon.ico' }],
    htmlAttrs: {
      lang: 'en',
    },
    bodyAttrs: {
      class: 'bg-elevated',
    },
  });

  useSeoMeta({
    titleTemplate: `%s - ${title}`,
    title: 'Error',
    ogSiteName: title,
    description,
    ogDescription: description,
    twitterCard: 'summary_large_image',
  });
</script>

<template>
  <UApp>
    <AppHeader />

    <UMain>
      <UError
        :error="error"
        :clear="{
          label: `Back to ${title}`,
          size: 'xl',
          color: 'neutral',
          variant: 'link',
          icon: 'i-lucide-arrow-left',
          class: 'cursor-pointer',
        }"
      />
    </UMain>

    <AppFooter />
    <AppBottomNav />
  </UApp>
</template>
