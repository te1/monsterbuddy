<template>
  <section v-if="hasRelated">
    <h3 class="text-lg font-semibold">
      Related
    </h3>

    <div
      v-for="(relation, index) in monster.related"
      :key="relation.monster"
    >
      <div
        v-if="index > 0"
        class="my-2 border-t border-gray-300 dark:border-cool-600"
      />

      <MonsterRelatedItem :monster="getMonsterByName(relation.monster)" />
    </div>
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
