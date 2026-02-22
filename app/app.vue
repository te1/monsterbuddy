<script lang="ts" setup>
  const { description, title } = useAppConfig().seo;

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
    ogSiteName: title,
    description,
    ogDescription: description,
    twitterCard: 'summary_large_image',
  });
</script>

<template>
  <UApp :tooltip="{ delayDuration: 300, skipDelayDuration: 0 }">
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
