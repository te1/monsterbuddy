<template>
  <img
    v-if="hasImage"
    :src="imageUrl"
    :alt="monster.name"
  >

  <MonsterIcon
    v-else
    class="p-2"
    :monster="monster"
  />
</template>

<script>
  export default {
    props: {
      monster: {
        type: Object,
        required: true,
      },
    },

    computed: {
      imageUrl() {
        try {
          return require(`~/assets/monsters/${this.monster.name}.png`);
        } catch (e) {
          return null;
        }
      },

      hasImage() {
        return !!this.imageUrl;
      },
    },
  };
</script>
