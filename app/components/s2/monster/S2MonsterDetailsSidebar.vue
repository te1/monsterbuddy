<script lang="ts" setup>
  import { monstersBySlug } from '~/services/2/data';
  import useHistoryStore from '~/stores/2/historyStore';

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
    return monster.value ? history.isMonsterPinned(monster.value.slug) : false;
  });

  const isMonstiePinned = computed(() => {
    return monster.value ? history.isMonstiePinned(monster.value.slug) : false;
  });

  const isEggPinned = computed(() => {
    return monster.value ? history.isEggPinned(monster.value.slug) : false;
  });

  function toggleMonsterPin() {
    if (monster.value) {
      history.togglePinnedMonster(monster.value.slug);
    }
  }

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
          <AppPinToggle
            :modelValue="isMonsterPinned"
            :disabled="!monster"
            subject="monster"
            @update:modelValue="toggleMonsterPin"
          />

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
            <USkeleton v-for="i in 3" :key="i" class="my-1 h-6 w-[80%]" />
          </template>
        </ClientOnly>
      </div>
    </template>
  </UTabs>
</template>
