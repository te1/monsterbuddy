<script lang="ts" setup>
  const { description, title } = useAppConfig().seo;

  const route = useRoute();
  const gameType = computed(() => routePathToGameType(route.path));
  const icon = computed(() => {
    switch (gameType.value) {
      case 'mhst1':
        return '/s1.ico';

      case 'mhst2':
        return '/s2.ico';

      case 'mhst3':
        return '/s3.ico';

      default:
        return '/favicon.ico';
    }
  });

  useHead(() => ({
    meta: [
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ key: 'app-favicon', rel: 'icon', href: icon.value }],
    htmlAttrs: {
      lang: 'en',
    },
    bodyAttrs: {
      class: 'bg-elevated',
    },
  }));

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
