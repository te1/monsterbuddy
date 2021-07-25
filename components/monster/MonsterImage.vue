<template>
  <img
    v-if="hasImage"
    :src="imageUrl"
    :alt="monster.name"
    :title="monster.name"
    class="max-w-[525px] max-h-[465px]"
    width="525"
    height="465"
  >

  <div v-else-if="!hideFallback">
    <div class="w-full h-full flex items-center justify-center">
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
