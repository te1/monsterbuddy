<script lang="ts" setup>
  import { monstersBySlug } from '~/services/3/data';
  import useMonsterHistoryStore from '~/stores/3/monsterHistoryStore';

  const history = useMonsterHistoryStore();

  const route = useRoute();

  const monster = computed(() => {
    const slug = route.params.slug;

    if (typeof slug !== 'string') {
      return undefined;
    }

    return monstersBySlug.get(slug);
  });

  const isMonstiePinned = computed(() => {
    return monster.value ? history.isMonstiePinned(monster.value.slug) : false;
  });

  const isEggPinned = computed(() => {
    return monster.value ? history.isEggPinned(monster.value.slug) : false;
  });

  function toggleMonstiePin() {
    if (monster.value) {
      history.togglePinnedMonstie(monster.value.slug);
    }
  }

  function toggleEggPin() {
    if (monster.value) {
      history.togglePinnedEgg(monster.value.slug);
    }
  }

  const tabs = [{ label: 'Actions', slot: 'actions' }];
</script>

<template>
  <UTabs color="neutral" variant="link" :items="tabs">
    <template #actions>
      <div class="flex flex-col gap-0">
        <ClientOnly>
          <template v-if="monster?.hatchable">
            <AppPinToggle
              :modelValue="isMonstiePinned"
              :disabled="!monster"
              subject="monstie"
              @update:modelValue="toggleMonstiePin"
            />

            <AppPinToggle
              :modelValue="isEggPinned"
              :disabled="!monster"
              subject="egg"
              @update:modelValue="toggleEggPin"
            />
          </template>

          <template #fallback>
            <USkeleton v-for="i in 2" :key="i" class="my-1 h-6 w-[80%]" />
          </template>
        </ClientOnly>
      </div>
    </template>
  </UTabs>
</template>
