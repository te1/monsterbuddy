<template>
  <div class="flex items-center">
    <WeaponTypeIcon
      type="slash"
      :ineffective="slashIneffective"
      class="w-8 h-8"
    />

    <WeaponTypeIcon
      type="blunt"
      :ineffective="bluntIneffective"
      class="w-8 h-8"
    />

    <WeaponTypeIcon
      type="pierce"
      :ineffective="pierceIneffective"
      class="w-8 h-8"
    />
  </div>
</template>

<script>
  import _ from 'lodash';

  export default {
    name: 'WeaponEffectiveness',

    props: {
      types: {
        type: Array,
        required: true,
      },
    },

    computed: {
      slashIneffective() {
        return !_.includes(this.types, 'slash');
      },

      bluntIneffective() {
        return !_.includes(this.types, 'blunt');
      },

      pierceIneffective() {
        return !_.includes(this.types, 'pierce');
      },
    },
  };
</script>
