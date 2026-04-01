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
  <section class="relative flex items-start">
    <div class="-ml-3 size-[120px] shrink-0">
      <S2EggImage :monster="monster" />
    </div>

    <div>
      <h3 class="text-lg font-semibold">Retreat</h3>

      <!-- eslint-disable-next-line vue/no-v-html -->
      <div v-html="retreat" />
    </div>

    <div class="absolute top-1 right-1">
      <ClientOnly>
        <AppPinToggle :modelValue="isPinned" subject="egg" noLabel @update:modelValue="togglePin" />
      </ClientOnly>
    </div>
  </section>
</template>
