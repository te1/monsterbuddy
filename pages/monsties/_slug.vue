<template>
  <div v-if="monster">
    <AppTopBar
      :heading="monster.name"
      showBack
    />

    <main class="space-y-3">
      <MonsterInfoCard
        class="box px-4 py-2"
        :monster="monster"
        showLinkToMonster
      />

      <MonstieInfoCard
        class="box px-4 py-2"
        :monster="monster"
      />

      <MonsterImageCard
        class="box px-4 py-2"
        :monster="monster"
      />

      <MonstieStatsCard
        class="box px-4 py-2"
        :monster="monster"
      />

      <MonsterRelatedCard
        class="box px-4 py-2"
        :monster="monster"
        monstieMode
      />
    </main>
  </div>
</template>

<script>
  import { monstiesBySlug, isDeviant } from '~/services/data';
  import { makeHead } from '~/services/utils';

  export default {
    name: 'PageMonstieDetails',

    data() {
      return {
        monster: monstiesBySlug[this.$route.params.slug],
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
        canonical: `https://monsterbuddy.app/monsties/${this.monster.slug}/`,
        image: `https://monsterbuddy.app/images/monsters-small/${this.monster.name}.webp`,
        imageAlt: this.monster.name,
      });
    },

    created() {
      if (this.monster == null) {
        this.$nuxt.error({
          statusCode: 404,
          message: 'This page could not be found',
        });
      }
    },
  };
</script>
