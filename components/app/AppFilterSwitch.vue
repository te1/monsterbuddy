<template>
  <div class="flex items-center gap-1 cursor-pointer">
    <span>
      <FaIcon :icon="icon" />
    </span>
    <span v-text="caption" />
  </div>
</template>

<script>
  export default {
    name: 'AppFilterSwitch',

    props: {
      value: {
        type: Boolean,
        required: false,
        default: null,
      },

      texts: {
        type: Array,
        required: false,
        default: null,
      },
    },

    computed: {
      icon() {
        switch (this.value) {
          case null:
            return ['fas', 'star-of-life'];

          case true:
            return ['fas', 'check'];

          case false:
            return ['fas', 'times'];

          default:
            return null;
        }
      },

      caption() {
        let texts = this.texts ?? [];

        switch (this.value) {
          case null:
            return texts[0] ?? 'All';

          case true:
            return texts[1] ?? 'Yes';

          case false:
            return texts[2] ?? 'No';

          default:
            return null;
        }
      },
    },
  };
</script>
