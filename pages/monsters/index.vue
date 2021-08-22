<template>
  <div>
    <AppTopBar
      :showBack="showFilter"
      backFallback="/monsters/"
      :heading="heading"
    >
      <AppSearchBox
        v-if="!showFilter"
        v-model="monsterFilter.nameFilter"
      />
    </AppTopBar>

    <NuxtLink :to="fabTarget">
      <AppFloatingButton :title="fabTitle">
        <FaIcon :icon="fabIcon" />
      </AppFloatingButton>
    </NuxtLink>

    <NuxtChild v-show="!leaving && showFilter" />

    <main v-show="leaving || !showFilter">
      <ul>
        <li
          v-for="(group, key) in monsterFilter.groupedMonsters"
          :key="key"
          class="mt-3 first:mt-0 "
        >
          <div
            v-if="monsterFilter.isGrouped"
            class="flex items-center mb-1"
          >
            <FaIcon
              v-if="monsterFilter.sortKey === 'genus'"
              class="!w-6 text-gray-500 dark:text-cool-400"
              :icon="['fas', 'dna']"
            />

            <FaIcon
              v-if="monsterFilter.sortKey === 'habitat'"
              class="!w-6 text-gray-500 dark:text-cool-400"
              :icon="['fas', 'map-marker-alt']"
            />

            <div
              class="font-semibold mb-1"
              v-text="key"
            />
          </div>

          <div class="grid gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <NuxtLink
              v-for="monster in group"
              :key="monster.no"
              :to="`/monsters/${monster.slug}/`"
            >
              <MonsterListItem
                :monster="monster"
                :mode="monsterFilter.mode"
                class="box box-link px-1 overflow-hidden"
              />
            </NuxtLink>
          </div>
        </li>
      </ul>

      <MonsterNoResults v-if="monsterFilter.isEmpty">
        No monsters found
      </MonsterNoResults>
    </main>
  </div>
</template>

<script>
  import { mapStores } from 'pinia';
  import useMonsterFilter from '~/stores/monsterFilter';
  import { makeHead } from '~/services/utils';

  export default {
    name: 'PageMonsters',

    provide: {
      useFilterStore: useMonsterFilter,
    },

    beforeRouteEnter(to, from, next) {
      next((vm) => {
        vm.leaving = false;
        vm.$useHistoryStore().lastList = 'monsters';
      });
    },

    beforeRouteLeave(to, from, next) {
      this.leaving = true;
      next();
    },

    data() {
      return {
        leaving: false,
      };
    },

    head() {
      return makeHead({
        title: 'Monster Buddy - Monster List For Monster Hunter Stories 2',
        description:
          'Quickly check for monster attack patterns, elemental weaknesses and weapon effectiveness on body parts',
        canonical: 'https://monsterbuddy.app/monsters/',
      });
    },

    computed: {
      ...mapStores(useMonsterFilter),

      showFilter() {
        // workaround for <NuxtChild> not playing nice with <Nuxt keep-alive>
        return this.$route?.path === '/monsters/filter/';
      },

      heading() {
        if (this.showFilter) {
          return 'View Options';
        }
        return null;
      },

      fabTarget() {
        if (this.showFilter) {
          return '/monsters/';
        }
        return '/monsters/filter/';
      },

      fabTitle() {
        if (this.showFilter) {
          return 'Apply';
        }
        return 'View options';
      },

      fabIcon() {
        if (this.showFilter) {
          return ['fas', 'check'];
        }
        return ['fas', 'sliders-h'];
      },
    },
  };
</script>
