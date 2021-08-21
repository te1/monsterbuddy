<template>
  <div
    class="flex items-center gap-1 cursor-pointer"
    @click="toggle"
  >
    <span>
      <FaIcon
        :class="{ 'opacity-0': !hasIcon }"
        :icon="icon"
      />
    </span>
    <span v-text="caption" />
  </div>
</template>

<script>
  export default {
    name: 'AppSortToggle',

    props: {
      value: {
        type: String,
        required: true,
      },

      sortKey: {
        type: String,
        required: true,
      },

      sortOrder: {
        type: String,
        required: true,
      },

      defaultSortOrder: {
        type: String,
        required: false,
        default: 'asc',
      },
    },

    computed: {
      active() {
        return this.sortKey === this.value;
      },

      hasIcon() {
        return this.active && this.sortOrder != null;
      },

      icon() {
        if (!this.hasIcon) {
          return ['fas', 'star-of-life'];
        }

        switch (this.sortOrder) {
          case 'asc':
            return ['fas', 'sort-amount-up-alt'];

          case 'desc':
            return ['fas', 'sort-amount-down'];

          default:
            return null;
        }
      },

      caption() {
        if (!this.active) {
          return null;
        }

        switch (this.sortOrder) {
          case 'asc':
            return 'Ascending';

          case 'desc':
            return 'Descending';

          default:
            return null;
        }
      },
    },

    methods: {
      getOtherSortOrder(sortOrder) {
        return sortOrder === 'asc' ? 'desc' : 'asc';
      },

      toggle() {
        if (this.sortKey === this.value) {
          this.$emit('update:sortOrder', this.getOtherSortOrder(this.sortOrder));
        } else {
          this.$emit('update:sortKey', this.value);
          this.$emit('update:sortOrder', this.defaultSortOrder);
        }
      },
    },
  };
</script>
