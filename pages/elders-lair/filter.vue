<template>
  <div class="space-y-3">
    <MonsterFilter
      backTarget="/elders-lair/"
      :modes="modes"
      hideSort
      showEldersLairFilter
      showHatchableFilter
    />
  </div>
</template>

<script>
  export default {
    name: 'PageEldersLairFilter',

    inject: ['useFilterStore'],

    computed: {
      store() {
        return this.useFilterStore();
      },

      modes() {
        return [
          { value: 'location', caption: 'Location' },
          { value: 'combat', caption: 'Attack Pattern' },
        ];
      },
    },
  };
</script>
