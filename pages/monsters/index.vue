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

      <template
        v-if="history.hasRecentMonsters && !showFilter"
        #right
      >
        <AppIconButton
          v-if="showRecent"
          class="mr-2"
          title="Show all monsters"
          :icon="['fas', 'times']"
          @click="showRecent = false"
        />

        <AppIconButton
          v-else
          class="mr-2"
          title="Show recent monsters"
          :icon="['fas', 'history']"
          @click="showRecent = true"
        />
      </template>
    </AppTopBar>

    <NuxtLink
      v-if="!showRecent"
      :to="fabTarget"
    >
      <AppFloatingButton :title="fabTitle">
        <FaIcon :icon="fabIcon" />
      </AppFloatingButton>
    </NuxtLink>

    <NuxtChild v-show="!leaving && showFilter" />

    <main v-show="leaving || !showFilter">
      <div
        v-if="showActiveFilters"
        class="fixed z-20 w-full inset-x-0 top-12 mt-1"
      >
        <div class="container px-4 flex flex-wrap gap-2 items-center justify-center">
          <AppFilterPill
            v-if="monsterFilter.hasActiveSort && !showRecent"
            :caption="monsterFilter.activeSort.caption"
            filterTarget="/monsties/filter/"
            :sortOrder="monsterFilter.activeSort.order"
          />

          <template v-if="!showRecent">
            <AppFilterPill
              v-for="filter in monsterFilter.activeFilters"
              :key="filter.name"
              :caption="filter.value"
              filterTarget="/monsters/filter/"
              showRemove
              @remove="monsterFilter[filter.name] = null"
            />
          </template>

          <AppFilterPill
            v-if="showRecent"
            caption="Recent"
            filterTarget=""
            showRemove
            @remove="showRecent = false"
          />
        </div>
      </div>

      <ul
        class="space-y-5"
        :class="{ 'mt-8': showActiveFilters }"
      >
        <li
          v-for="(group, key) in groupedMonsters"
          :key="key"
        >
          <div
            v-if="monsterFilter.isGrouped && !showRecent"
            class="sticky top-12 z-10 flex items-center -mx-1 px-1 -mt-3 -mb-1 py-1 border-t bg-gray-300 border-gray-300 dark:bg-cool-700 dark:border-cool-700"
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

          <div class="mt-1 grid gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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

      <MonsterNoResults v-if="monsterFilter.isEmpty && !showRecent">
        No monsters found
      </MonsterNoResults>
    </main>
  </div>
</template>

<script>
  import _ from 'lodash';
  import { mapStores } from 'pinia';
  import useMonsterFilter from '~/stores/monsterFilter';
  import { makeHead } from '~/services/utils';
  import { monstersBySlug } from '~/services/data';

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
        showRecent: false,
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

      history() {
        return this.$useHistoryStore();
      },

      showFilter() {
        // workaround for <NuxtChild> not playing nice with <Nuxt keep-alive>
        return this.$route?.path === '/monsters/filter/';
      },

      showActiveFilters() {
        return (
          this.monsterFilter.hasActiveSort ||
          this.monsterFilter.hasActiveFilters ||
          this.showRecent
        );
      },

      groupedMonsters() {
        if (this.showRecent) {
          return {
            all: _.map(this.history.recentMonsters, (slug) => {
              return monstersBySlug[slug];
            }),
          };
        }
        return this.monsterFilter.groupedMonsters;
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
