<template>
  <div class="space-y-3">
    <MonsterFilter
      backTarget="/monsters/"
      :modes="modes"
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
          { value: 'combat', caption: 'Attack Pattern' },
          { value: 'rarity', caption: 'Rarity' },
        ];
      },
    },
  };
</script>
