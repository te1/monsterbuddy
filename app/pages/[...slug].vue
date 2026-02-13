<script setup lang="ts">
  definePageMeta({
    layout: 'docs',
  });

  const title = 'Introduction';
  const description = 'Welcome to Nuxt UI documentation template.';

  useSeoMeta({
    title,
    ogTitle: title,
    description,
    ogDescription: description,
  });

  const headline = 'Getting Started';

  defineOgImageComponent('Docs', {
    headline: headline,
  });

  const links = [
    {
      icon: 'i-lucide-external-link',
      label: 'Edit this page',
      text: 'Edit this page',
      to: `link`,
      target: '_blank',
      id: 'edit',
      depth: 1,
    },
  ];
</script>

<template>
  <UPage>
    <UPageHeader :title="title" :description="description" :headline="headline">
      <template #links>
        <UButton v-for="(link, index) in links" :key="index" v-bind="link" />

        <PageHeaderLinks />
      </template>
    </UPageHeader>

    <UPageBody>
      <div>CONTENT</div>
    </UPageBody>

    <template v-if="links?.length" #right>
      <UContentToc :title="title" :links="links">
        <template #bottom>
          <div class="hidden space-y-6 lg:block" :class="{ 'mt-6!': links?.length }">
            <USeparator v-if="links?.length" type="dashed" />

            <UPageLinks :title="title" :links="links" />
          </div>
        </template>
      </UContentToc>
    </template>
  </UPage>
</template>
