<script lang="ts" setup>
  import type { Monster } from '~/services/2/types';
  import { monstersByName } from '~/services/2/data';

  const props = defineProps<{ monster: Monster }>();

  const hasRelated = computed(() => !!props.monster?.related?.length);

  function getMonsterByName(name: string) {
    return monstersByName.get(name);
  }
</script>

<template>
  <section v-if="hasRelated">
    <h3 class="text-lg font-semibold">Related</h3>

    <div v-for="(relation, index) in monster.related" :key="relation.monster">
      <div v-if="index > 0" class="my-2 border-t border-neutral-300 dark:border-neutral-600" />

      <S2MonsterRelatedItem :monster="getMonsterByName(relation.monster)" />
    </div>
  </section>
</template>
