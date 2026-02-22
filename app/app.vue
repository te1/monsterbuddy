<script setup lang="ts">
  const { title } = useAppConfig().seo;

  useHead({
    meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1' }],
    link: [{ rel: 'icon', href: '/favicon.ico' }],
    htmlAttrs: {
      lang: 'en',
    },
  });

  const description = 'Create stunning, fast and SEO-optimized documentation sites with Nuxt UI.';

  useSeoMeta({
    titleTemplate: `%s - ${title}`,
    ogSiteName: title,
    description,
    ogDescription: description,
    twitterCard: 'summary_large_image',
  });
</script>

<template>
  <UApp>
    <NuxtLoadingIndicator color="var(--ui-primary)" />

    <AppHeader />

    <UMain>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </UMain>

    <AppFooter />
    <AppBottomNav />
  </UApp>
</template>
