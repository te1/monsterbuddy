<template>
  <section class="space-y-2 overflow-hidden">
    <div class="flex">
      <EggImage :monster="monster" />

      <div class="ml-3 space-y-2">
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div v-html="retreat" />

        <div class="flex gap-3">
          <div
            v-for="action in monster.monstie.ridingActions"
            :key="action"
            v-text="action"
          />
        </div>

        <div v-text="monster.monstie.kinshipSkill" />
      </div>
    </div>
  </section>
</template>

<script>
  import { parseSomeMarkdown } from '~/services/utils';

  export default {
    name: 'MonstieInfoCard',

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
