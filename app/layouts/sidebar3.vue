<script lang="ts" setup></script>

<template>
  <UContainer>
    <UPage>
      <slot />

      <template #right>
        <ClientOnly>
          <UPageAside>Sidebar MHST3</UPageAside>
        </ClientOnly>
      </template>
    </UPage>
  </UContainer>
</template>
