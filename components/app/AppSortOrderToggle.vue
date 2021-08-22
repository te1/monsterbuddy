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
    name: 'AppSortOrderToggle',

    props: {
      value: {
        type: String,
        required: true,
      },
    },

    computed: {
      icon() {
        switch (this.value) {
          case 'asc':
            return ['fas', 'sort-amount-up-alt'];

          case 'desc':
            return ['fas', 'sort-amount-down'];

          default:
            return null;
        }
      },

      caption() {
        switch (this.value) {
          case 'asc':
            return 'Ascending';

          case 'desc':
            return 'Descending';

          default:
            return null;
        }
      },
    },
  };
</script>
