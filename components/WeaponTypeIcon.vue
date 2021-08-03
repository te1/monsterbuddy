<template>
  <img
    :src="imageUrl"
    :alt="caption"
    :title="caption"
    width="60"
    height="60"
    :class="{ 'opacity-75': ineffective }"
  >
</template>

<script>
  import { formatWeaponType } from '~/services/utils';

  export default {
    name: 'WeaponTypeIcon',

    props: {
      type: {
        type: String,
        required: true,
      },

      ineffective: {
        type: Boolean,
        required: false,
        default: false,
      },
    },

    computed: {
      imageUrl() {
        try {
          if (this.ineffective) {
            return require(`~/assets/icons/weapon-${this.type}-ineffective.svg`);
          }
          return require(`~/assets/icons/weapon-${this.type}.svg`);
        } catch (e) {
          return require('~/assets/icons/type-unknown.svg');
        }
      },

      caption() {
        let result = formatWeaponType(this.type);

        if (this.ineffective) {
          result += ' (ineffective)';
        }

        return result;
      },
    },
  };
</script>
