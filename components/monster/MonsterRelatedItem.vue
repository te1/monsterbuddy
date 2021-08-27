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
  import _ from 'lodash';

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
        return this.history.lastList === 'monsties' && this.monster.hatchable;
      },

      showEgg() {
        return this.history.lastList === 'eggs' && this.monster.hatchable;
      },

      mode() {
        let mode = this.history.lastListMode;

        if (this.showMonstie || this.showEgg) {
          if (
            _.includes(
              [
                'location',
                'location-coop',
                'location-eldersLair',
                'ridingActions',
                'retreat',
                'rarity',
                'stats',
              ],
              mode
            )
          ) {
            return mode;
          }
          return undefined;
        }

        // monster
        if (
          _.includes(
            [
              'location',
              'location-coop',
              'location-eldersLair',
              'combat',
              'rarity',
            ],
            mode
          )
        ) {
          return mode;
        }
        return undefined;
      },
    },
  };
</script>
