<template>
  <NuxtLink :to="`/monsters/${monster.slug}/`">
    <EggListItem
      v-if="showEgg"
      class="-mx-3 box-link-inline overflow-hidden"
      :monster="monster"
      :mode="mode"
    />

    <MonstieListItem
      v-else-if="showMonstie"
      class="-mx-3 box-link-inline overflow-hidden"
      :monster="monster"
      :mode="mode"
    />

    <MonsterListItem
      v-else
      class="-mx-3 box-link-inline overflow-hidden"
      :monster="monster"
      :mode="mode"
    />
  </NuxtLink>
</template>

<script>
  export default {
    name: 'MonsterRelatedItem',

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
        return this.history.lastListModeSmart(this.monster);
      },
    },
  };
</script>
