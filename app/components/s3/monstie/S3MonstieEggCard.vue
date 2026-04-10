<script lang="ts" setup>
  import type { Monster } from '~/services/3/types';
  import useMonsterHistoryStore from '~/stores/3/monsterHistoryStore';

  const props = defineProps<{ monster: Monster }>();

  const history = useMonsterHistoryStore();

  const isPinned = computed(() => {
    return history.isEggPinned(props.monster.slug);
  });

  function togglePin() {
    history.togglePinnedEgg(props.monster.slug);
  }
</script>

<template>
  <section class="relative flex items-center justify-center">
    <div class="size-[120px] shrink-0">
      <S3EggImage :monster="monster" />
    </div>

    <div class="absolute top-1 right-1">
      <ClientOnly>
        <AppPinToggle :modelValue="isPinned" subject="egg" noLabel @update:modelValue="togglePin" />
      </ClientOnly>
    </div>
  </section>
</template>
