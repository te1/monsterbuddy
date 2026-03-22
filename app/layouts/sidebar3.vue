<script lang="ts" setup></script>

<template>
  <UContainer>
    <UPage class="mt-0" :ui="{ center: 'pt-3' }">
      <slot />

      <template #right>
        <ClientOnly>
          <UPageAside>Sidebar MHST3</UPageAside>
        </ClientOnly>
      </template>
    </UPage>
  </UContainer>
</template>
