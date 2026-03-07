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
  <!-- TODO CSS -->

  <section class="relative">
    <S2EggImage :monster="monster" />

    <div class="mx-3 flex-1">
      <h3 class="text-lg font-semibold">Retreat</h3>

      <!-- eslint-disable-next-line vue/no-v-html -->
      <div v-html="retreat" />
    </div>

    <ClientOnly>
      <div class="absolute top-0 right-0 pt-3 pr-3">
        <AppPinToggle :modelValue="isPinned" subject="egg" noLabel @update:modelValue="togglePin" />
      </div>
    </ClientOnly>
  </section>
</template>
