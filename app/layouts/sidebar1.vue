<script lang="ts" setup></script>

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
      class="pointer-events-none fixed right-[calc(-154px+var(--scrollbar-width,0px))] bottom-[-154px] -z-10 size-[448px] -rotate-23 overflow-hidden opacity-5 select-none lg:right-[calc(-192px+var(--scrollbar-width,0px))] lg:bottom-[-192px] lg:opacity-25"
    >
      <img src="~/assets/app1.png" alt="Monster Buddy" class="size-full object-cover" />
    </div>
  </UContainer>
</template>
