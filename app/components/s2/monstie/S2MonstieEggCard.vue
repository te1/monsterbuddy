<script lang="ts" setup>
  import type { Monster } from '~/services/2/types';

  const props = defineProps<{ monster: Monster }>();

  const retreat = computed(() => parseSomeMarkdown(props.monster.monstie?.retreat ?? ''));

  const isPinned = false; // TODO history store

  function togglePin() {
    // TODO history store
  }
</script>

<template>
  <section>
    <S2EggImage :monster="monster" />

    <div class="mx-3 flex-1">
      <h3 class="text-lg font-semibold">Retreat</h3>

      <!-- eslint-disable-next-line vue/no-v-html -->
      <div v-html="retreat" />
    </div>

    <AppPinToggle :pinned="isPinned" subject="egg" @toggle="togglePin" />
  </section>
</template>
