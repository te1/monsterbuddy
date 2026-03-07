<script lang="ts" setup>
  /* TODO implement back button and alternate title on mobile
  import { monstersBySlug } from '~/services/2/data';

  const router = useRouter();
  const route = useRoute();
  const isMobile = useIsMobile();

  const mobileHeader = computed(() => {
    if (route.path.startsWith('/2/monsters/')) {
      const slug = route.params.slug;

      if (typeof slug === 'string') {
        const monster = monstersBySlug.get(slug);

        if (monster) {
          return monster.name;
        }
      }
    }

    return route.meta.mobileHeader;
  });
  */
</script>

<template>
  <!--
  <UTooltip v-if="isMobile" text="Back">
    <UButton
      icon="ph:arrow-left"
      color="neutral"
      variant="ghost"
      aria-label="Back"
      @click="router.back()"
    />
  </UTooltip>

  <div v-if="mobileHeader">{{ mobileHeader }}</div>
  -->

  <NuxtLink to="/">
    <div class="text-lg font-medium tracking-wide dark:text-toned">Monster Buddy</div>
  </NuxtLink>
</template>
