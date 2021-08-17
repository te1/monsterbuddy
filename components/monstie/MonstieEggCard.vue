<template>
  <section class="flex overflow-hidden">
    <div class="flex-1">
      <h3 class="text-lg font-semibold">
        Retreat
      </h3>

      <!-- eslint-disable-next-line vue/no-v-html -->
      <div v-html="retreat" />
    </div>

    <EggImage
      class="-mx-3"
      :monster="monster"
    />
  </section>
</template>

<script>
  import { parseSomeMarkdown } from '~/services/utils';

  export default {
    name: 'MonstieEggCard',

    props: {
      monster: {
        type: Object,
        required: true,
      },
    },

    computed: {
      retreat() {
        return parseSomeMarkdown(this.monster?.monstie?.retreat);
      },
    },
  };
</script>
