<script lang="ts" setup>
  import type { Monster, RelationType } from '~/services/2/types';
  import { monstersByName } from '~/services/2/data';

  const props = defineProps<{ monster: Monster }>();

  const relations = computed(() => {
    return (props.monster.related ?? [])
      .map((relation) => {
        return {
          type: relation.type,
          monster: monstersByName.get(relation.monster),
        };
      })
      .filter(
        (relation): relation is { type: RelationType; monster: Monster } => relation.monster != null
      );
  });

  const hasRelated = computed(() => relations.value.length > 0);
</script>

<template>
  <section v-if="hasRelated">
    <h3 class="text-lg font-semibold">Related</h3>

    <div v-for="(relation, index) in relations" :key="relation.monster.name">
      <div v-if="index > 0" class="my-2 border-t border-neutral-300 dark:border-neutral-600" />

      <S2MonsterRelatedItem :monster="relation.monster" />
    </div>
  </section>
</template>
