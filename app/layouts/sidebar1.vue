<script lang="ts" setup>
  import mhst1Egg from '~/assets/1/monsterbuddy.png';
</script>

<template>
  <UContainer>
    <UPage class="mt-0" :ui="{ center: 'pt-3' }">
      <slot />

      <template #right>
        <ClientOnly>
          <UPageAside>Sidebar MHST1</UPageAside>
        </ClientOnly>
      </template>
    </UPage>

    <div
      class="pointer-events-none fixed right-[calc(-154px+var(--scrollbar-width,0px))] bottom-[-154px] -z-10 size-[448px] -rotate-23 overflow-hidden opacity-10 select-none lg:right-[calc(-192px+var(--scrollbar-width,0px))] lg:bottom-[-192px] lg:opacity-50 dark:opacity-5 dark:lg:opacity-25"
    >
      <div class="size-full bg-cover bg-center" :style="`background-image: url(${mhst1Egg})`" />
    </div>
  </UContainer>
</template>
