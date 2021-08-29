<template>
  <div v-if="catavanStand">
    <AppTopBar
      :heading="catavanStand.name"
      showBack
      backFallback="/catavan-stands/"
    />

    <main>
      <div class="grid gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <MonsterSmartListItem
          v-for="monster in monsters"
          :key="monster.no"
          :monster="monster"
        />
      </div>
    </main>
  </div>
</template>

<script>
  import {
    catavanStandsBySlug,
    getMonstersByCatavanStand,
  } from '~/services/data';
  import { makeHead } from '~/services/utils';

  export default {
    name: 'PageCatavanStandDetails',

    data() {
      return {
        catavanStand: catavanStandsBySlug[this.$route.params.slug],
      };
    },

    head() {
      if (this.catavanStand == null) {
        return;
      }

      let description = `${this.catavanStand.name} is a catavan stand `;

      if (this.catavanStand.zone) {
        description += `in ${this.catavanStand.zone} `;
      }

      description += 'that you can fast travel to.';

      if (this.monsters.length) {
        description += ` It is home to ${this.monsters.length} different monsters.`;
      }

      return makeHead({
        title: `Monster Buddy - ${this.catavanStand.name} In Monster Hunter Stories 2`,
        description,
        canonical: `https://monsterbuddy.app/catavan-stands/${this.catavanStand.slug}/`,
      });
    },

    computed: {
      monsters() {
        return getMonstersByCatavanStand(this.catavanStand.name);
      },
    },

    created() {
      if (this.catavanStand == null) {
        this.$nuxt.error({
          statusCode: 404,
          message: 'This page could not be found',
        });
      }
    },
  };
</script>
