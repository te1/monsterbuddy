<template>
  <img
    :src="imageUrl"
    :alt="caption"
    :title="caption"
    width="60"
    height="60"
  >
</template>

<script>
  import { formatAttackType } from '~/services/utils';

  export default {
    name: 'AttackTypeIcon',

    props: {
      type: {
        type: String,
        required: false,
        default: null,
      },

      monster: {
        type: Object,
        required: false,
        default() {
          return null;
        },
      },
    },

    computed: {
      resolvedType() {
        if (this.type) {
          return this.type;
        }
        if (this.monster && this.monster.monstie) {
          return this.monster.monstie.attackType;
        }
        return null;
      },

      imageUrl() {
        try {
          return require(`~/assets/icons/${this.resolvedType}.svg`);
        } catch (e) {
          return require('~/assets/icons/unknown-type.svg');
        }
      },

      caption() {
        return formatAttackType(this.resolvedType);
      },
    },
  };
</script>
