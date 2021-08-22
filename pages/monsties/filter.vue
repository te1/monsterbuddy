<template>
  <div class="space-y-3">
    <MonsterFilter
      backTarget="/monsties/"
      :modes="modes"
      showSortByStats
      showAttackTypeFilter
      showAttackElementFilter
      showRidingActionFilter
    />
  </div>
</template>

<script>
  export default {
    name: 'PageMonstiesFilter',

    inject: ['useFilterStore'],

    computed: {
      store() {
        return this.useFilterStore();
      },

      modes() {
        return [
          { value: 'location', caption: 'Location' },
          { value: 'ridingActions', caption: 'Riding Actions' },
          { value: 'retreat', caption: 'Retreat' },
          { value: 'stats', caption: 'Stats' },
        ];
      },
    },
  };
</script>
