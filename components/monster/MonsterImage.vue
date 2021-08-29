<template>
  <img
    v-if="hasImage"
    :src="imageUrl"
    :alt="monster.name"
    :title="monster.name"
    class="max-w-[282px] max-h-[250px]"
    width="282"
    height="250"
  >

  <div v-else-if="!hideFallback">
    <div
      class="w-full h-full flex items-center p-2"
      :class="justifyClass"
    >
      <MonsterIcon :monster="monster" />
    </div>
  </div>
</template>

<script>
  export default {
    name: 'MonsterImage',

    props: {
      monster: {
        type: Object,
        required: true,
      },

      hideFallback: {
        type: Boolean,
        required: false,
        default: false,
      },

      right: {
        type: Boolean,
        required: false,
        default: false,
      },
    },

    computed: {
      imageUrl() {
        try {
          return require(`~/assets/monsters-small/${this.monster.name}.webp`);
        } catch (e) {
          return null;
        }
      },

      hasImage() {
        return !!this.imageUrl;
      },

      justifyClass() {
        if (this.right) {
          return 'justify-end';
        }
        return 'justify-center';
      },
    },
  };
</script>
