<template>
  <NuxtLink :to="`/monsters/${monster.slug}/`">
    <EggListItem
      v-if="showEgg"
      class="box box-link px-1 overflow-hidden"
      :monster="monster"
      :mode="smartMode"
    />

    <MonstieListItem
      v-else-if="showMonstie"
      class="box box-link px-1 overflow-hidden"
      :monster="monster"
      :mode="smartMode"
    />

    <MonsterListItem
      v-else
      class="box box-link px-1 overflow-hidden"
      :monster="monster"
      :mode="smartMode"
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

      display: {
        type: String,
        required: false,
        default: null,
      },

      mode: {
        type: String,
        required: false,
        default: undefined,
      },
    },

    computed: {
      history() {
        return this.$useHistoryStore();
      },

      showMonstie() {
        if (this.display) {
          return this.display === 'monstie' && this.monster.hatchable;
        }
        return this.history.shouldShowMonstie(this.monster);
      },

      showEgg() {
        if (this.display) {
          return this.display === 'egg' && this.monster.hatchable;
        }
        return this.history.shouldShowEgg(this.monster);
      },

      smartMode() {
        return this.history.listModeSmart(
          this.showMonstie,
          this.showEgg,
          this.mode
        );
      },
    },
  };
</script>
