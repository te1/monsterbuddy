<script setup lang="ts">
  useHead({
    meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1' }],
    link: [{ rel: 'icon', href: '/favicon.ico' }],
    htmlAttrs: {
      lang: 'en',
    },
  });

  const description = 'Create stunning, fast and SEO-optimized documentation sites with Nuxt UI.';

  useSeoMeta({
    titleTemplate: `%s - Monster Buddy`,
    ogSiteName: 'Monster Buddy',
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
    <AppMobileBottomNav />
  </UApp>
</template>
