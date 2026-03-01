<script lang="ts" setup>
  import type { Monster } from '~/services/2/types';
  import useHistoryStore from '~/stores/2/historyStore';

  const props = defineProps<{ monster: Monster }>();

  const history = useHistoryStore();

  const retreat = computed(() => parseSomeMarkdown(props.monster.monstie?.retreat ?? ''));

  const isPinned = computed(() => {
    return history.isEggPinned(props.monster.slug);
  });

  function togglePin() {
    history.togglePinnedEgg(props.monster.slug);
  }
</script>

<template>
  <section class="relative">
    <S2EggImage :monster="monster" />

    <div class="mx-3 flex-1">
      <h3 class="text-lg font-semibold">Retreat</h3>

      <!-- eslint-disable-next-line vue/no-v-html -->
      <div v-html="retreat" />
    </div>

    <div class="absolute top-0 right-0 pt-3 pr-3">
      <AppPinToggle :pinned="isPinned" subject="egg" @toggle="togglePin" />
    </div>
  </section>
</template>
