<script lang="ts" setup>
  import type { Monster, RelationType } from '~/services/3/types';
  import { monstersByName } from '~/services/3/data';

  const props = withDefaults(
    defineProps<{
      monster: Monster;
      linkGenes?: boolean;
    }>(),
    {
      linkGenes: false,
    }
  );

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
    <h3 class="px-4 pt-2 pb-1 text-lg font-semibold">Related</h3>

    <div v-for="(relation, index) in relations" :key="relation.monster.name">
      <div v-if="index > 0" class="border-2 border-t border-neutral-100 dark:border-default" />

      <div class="box-link">
        <S3MonsterRelatedItem :monster="relation.monster" :linkGenes="linkGenes" />
      </div>
    </div>
  </section>
</template>
