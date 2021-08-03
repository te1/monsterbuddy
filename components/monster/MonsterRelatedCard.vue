<template>
  <section v-if="hasRelated">
    <h3 class="text-lg font-semibold">
      Related
    </h3>

    <NuxtLink
      v-for="(relation, index) in monster.related"
      :key="relation.monster"
      :to="`/monsters/${getMonsterByName(relation.monster).slug}/`"
    >
      <div
        v-if="index > 0"
        class="my-1 border-t border-gray-300"
      />

      <MonsterListItem
        class="overflow-hidden"
        :monster="getMonsterByName(relation.monster)"
      />
    </NuxtLink>
  </section>
</template>

<script>
  import { monstersByName } from '~/services/data';

  export default {
    name: 'MonsterRelatedCard',

    props: {
      monster: {
        type: Object,
        required: true,
      },
    },

    computed: {
      hasRelated() {
        return !!this.monster?.related?.length;
      },
    },

    methods: {
      getMonsterByName(name) {
        return monstersByName[name];
      },
    },
  };
</script>
