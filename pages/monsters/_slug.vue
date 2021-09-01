<template>
  <div v-if="monster">
    <AppTopBar
      :heading="monster.name"
      showBack
      backFallback="/monsters/"
    />

    <main class="space-y-3">
      <MonsterInfoCard
        class="box px-4 py-2"
        :monster="monster"
      />

      <MonsterCombatCard
        class="box px-4 py-2"
        :monster="monster"
      />

      <MonstieEggCard
        v-if="monster.hatchable"
        class="box px-4 py-2"
        :monster="monster"
      />

      <MonsterImageCard
        class="box px-4 py-2"
        :monster="monster"
      />

      <MonstieInfoCard
        v-if="monster.hatchable"
        class="box px-4 py-2"
        :monster="monster"
      />

      <MonstieStatsCard
        v-if="monster.hatchable"
        class="box px-4 py-2"
        :monster="monster"
      />

      <MonsterRelatedCard
        class="box px-4 py-2"
        :monster="monster"
      />
    </main>
  </div>
</template>

<script>
  import { monstersBySlug, isDeviant } from '~/services/data';
  import { makeHead } from '~/services/utils';

  export default {
    name: 'PageMonsterDetails',

    data() {
      return {
        monster: monstersBySlug[this.$route.params.slug],
      };
    },

    head() {
      if (this.monster == null) {
        return;
      }

      let description = `${this.monster.name} is a ${this.monster.rarity} star rarity `;

      if (this.monster.hatchable) {
        description += 'hatchable ';
      }

      if (isDeviant(this.monster)) {
        description += 'Deviant ';
      }

      description += `${this.monster.genus} found in ${this.monster.habitat}.`;

      return makeHead({
        title: `Monster Buddy - ${this.monster.name} In Monster Hunter Stories 2`,
        description,
        canonical: `https://monsterbuddy.app/monsters/${this.monster.slug}/`,
        image: `https://monsterbuddy.app/images/monsters-small/${this.monster.name}.webp`,
        imageAlt: this.monster.name,
      });
    },

    computed: {
      history() {
        return this.$useHistoryStore();
      },
    },

    created() {
      if (this.monster == null) {
        this.$nuxt.error({
          statusCode: 404,
          message: 'This page could not be found',
        });
      } else {
        this.history.addRecentMonster(this.monster.slug);
      }
    },
  };
</script>
