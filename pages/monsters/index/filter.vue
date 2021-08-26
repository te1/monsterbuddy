<template>
  <div class="space-y-3">
    <MonsterFilter
      backTarget="/monsters/"
      :modes="modes"
      showCoopQuestFilter
      showHatchableFilter
    />
  </div>
</template>

<script>
  export default {
    name: 'PageMonstersFilter',

    inject: ['useFilterStore'],

    computed: {
      store() {
        return this.useFilterStore();
      },

      modes() {
        return [
          { value: 'location', caption: 'Location' },
          { value: 'location-coop', caption: 'Co-Op Quest' },
          { value: 'combat', caption: 'Attack Pattern' },
          { value: 'rarity', caption: 'Rarity' },
        ];
      },
    },
  };
</script>
