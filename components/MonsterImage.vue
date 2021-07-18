<template>
  <img
    v-if="hasImage"
    :src="imageUrl"
    :alt="monster.name"
    width="525"
    height="465"
  >

  <MonsterIcon
    v-else
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
