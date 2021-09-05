<template>
  <AppIconButton
    :icon="icon"
    :title="title"
    class="text-xl"
    @click="toggle"
  />
</template>

<script>
  export default {
    name: 'AppPinToggle',

    props: {
      pinned: {
        type: Boolean,
        required: true,
      },

      subject: {
        type: String,
        required: false,
        default: null,
      },
    },

    computed: {
      icon() {
        if (this.pinned) {
          return ['fas', 'bookmark'];
        }
        return ['far', 'bookmark'];
      },

      title() {
        if (this.subject) {
          if (this.pinned) {
            return `Remove ${this.subject} bookmark`;
          }
          return `Bookmark ${this.subject}`;
        }

        if (this.pinned) {
          return 'Remove bookmark';
        }
        return 'Bookmark';
      },
    },

    methods: {
      toggle() {
        this.$emit('toggle', !this.pinned);
      },
    },
  };
</script>
