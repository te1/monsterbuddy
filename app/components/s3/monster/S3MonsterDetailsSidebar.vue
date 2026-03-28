<script lang="ts" setup>
  import { monstersBySlug } from '~/services/3/data';
  import useHistoryStore from '~/stores/3/historyStore';

  const history = useHistoryStore();

  const route = useRoute();

  const monster = computed(() => {
    const slug = route.params.slug;

    if (typeof slug !== 'string') {
      return undefined;
    }

    return monstersBySlug.get(slug);
  });

  const isMonsterPinned = computed(() => {
    return history.isMonsterPinned(monster.value?.slug ?? '');
  });

  const isMonstiePinned = computed(() => {
    return history.isMonstiePinned(monster.value?.slug ?? '');
  });

  const isEggPinned = computed(() => {
    return history.isEggPinned(monster.value?.slug ?? '');
  });

  function toggleMonsterPin() {
    if (monster.value) {
      history.togglePinnedMonster(monster.value.slug);
    }
  }

  function toggleMonstiePin() {
    history.togglePinnedMonstie(monster.value?.slug ?? '');
  }

  function toggleEggPin() {
    history.togglePinnedEgg(monster.value?.slug ?? '');
  }

  const tabs = [{ label: 'Actions', slot: 'actions' }];
</script>

<template>
  <LazyUTabs color="neutral" variant="link" :items="tabs" hydrateOnIdle>
    <template #actions>
      <div class="flex flex-col gap-0">
        <ClientOnly>
          <AppPinToggle
            :modelValue="isMonsterPinned"
            subject="monster"
            @update:modelValue="toggleMonsterPin"
          />

          <template v-if="monster?.hatchable">
            <AppPinToggle
              :modelValue="isMonstiePinned"
              subject="monstie"
              @update:modelValue="toggleMonstiePin"
            />

            <AppPinToggle
              :modelValue="isEggPinned"
              subject="egg"
              @update:modelValue="toggleEggPin"
            />
          </template>

          <template #fallback>
            <USkeleton v-for="i in 3" :key="i" class="my-1 h-6 w-[80%]" />
          </template>
        </ClientOnly>
      </div>
    </template>
  </LazyUTabs>
</template>
