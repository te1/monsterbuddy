<script lang="ts" setup>
  import useMonstieBuildsStore from '~/stores/3/monstieBuildsStore';

  const builds = useMonstieBuildsStore();

  function newBuild() {
    builds.newBuild();
  }

  /*
  const route = useRoute();

  const gene = computed(() => {
    const slug = route.params.slug;

    if (typeof slug !== 'string') {
      return undefined;
    }

    return genesBySlug.get(slug);
  });

  const isGenePinned = computed(() => {
    return gene.value ? history.isGenePinned(gene.value.slug) : false;
  });

  function toggleGenePin() {
    if (gene.value) {
      history.togglePinnedGene(gene.value.slug);
    }
  }
  */

  const tabs = [{ label: 'Actions', slot: 'actions' }];
</script>

<template>
  <UTabs color="neutral" variant="link" :items="tabs">
    <template #actions>
      <div class="flex flex-col gap-0">
        <ClientOnly>
          <UButton
            color="neutral"
            variant="link"
            label="New Build"
            icon="ph:list-plus"
            :ui="{ base: 'px-0 font-normal' }"
            @click="newBuild"
          />

          <!--
          <AppPinToggle
            :modelValue="isGenePinned"
            :disabled="!gene"
            subject="gene"
            @update:modelValue="toggleGenePin"
          />
          -->

          <template #fallback>
            <USkeleton class="my-1 h-6 w-[80%]" />
          </template>
        </ClientOnly>
      </div>
    </template>
  </UTabs>
</template>
