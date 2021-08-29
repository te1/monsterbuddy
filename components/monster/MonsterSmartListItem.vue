<template>
  <NuxtLink :to="`/monsters/${monster.slug}/`">
    <EggListItem
      v-if="showEgg"
      class="box box-link px-1 overflow-hidden"
      :monster="monster"
      :mode="mode"
    />

    <MonstieListItem
      v-else-if="showMonstie"
      class="box box-link px-1 overflow-hidden"
      :monster="monster"
      :mode="mode"
    />

    <MonsterListItem
      v-else
      class="box box-link px-1 overflow-hidden"
      :monster="monster"
      :mode="mode"
    />
  </NuxtLink>
</template>

<script>
  export default {
    name: 'MonsterSmartListItem',

    props: {
      monster: {
        type: Object,
        required: true,
      },
    },

    computed: {
      history() {
        return this.$useHistoryStore();
      },

      showMonstie() {
        return this.history.shouldShowMonstie(this.monster);
      },

      showEgg() {
        return this.history.shouldShowEgg(this.monster);
      },

      mode() {
        return 'rarity';
      },
    },
  };
</script>
