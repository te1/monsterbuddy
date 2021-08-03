<template>
  <span
    :class="classes"
    v-text="caption"
  />
</template>

<script>
  import { formatAttackType } from '~/services/utils';

  export default {
    name: 'AttackTypeLabel',

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

      caption() {
        return formatAttackType(this.resolvedType);
      },

      classes() {
        switch (this.resolvedType) {
          case 'power':
            return 'text-power dark:brightness-150';

          case 'speed':
            return 'text-speed  dark:brightness-150';

          case 'technical':
            return 'text-technical dark:brightness-150';

          default:
            return null;
        }
      },
    },
  };
</script>
