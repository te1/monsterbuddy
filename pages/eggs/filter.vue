<template>
  <div class="space-y-3">
    <MonsterFilter
      backTarget="/eggs/"
      :modes="modes"
      showEggColorFilter
      showCoopQuestFilter
      showCatavanFilter
      showAttackTypeFilter
      showAttackElementFilter
      showRidingActionFilter
    />
  </div>
</template>

<script>
  export default {
    name: 'PageEggsFilter',

    inject: ['useFilterStore'],

    computed: {
      store() {
        return this.useFilterStore();
      },

      modes() {
        return [
          { value: 'compact', caption: 'Compact' },
          { value: 'location', caption: 'Location' },
          { value: 'location-coop', caption: 'Co-Op Quest' },
          { value: 'ridingActions', caption: 'Riding Actions' },
          { value: 'retreat', caption: 'Retreat' },
          { value: 'rarity', caption: 'Rarity' },
        ];
      },
    },
  };
</script>
