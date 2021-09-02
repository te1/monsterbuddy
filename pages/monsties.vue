<template>
  <div>
    <AppTopBar
      :showBack="showFilter"
      backFallback="/monsties/"
      :heading="heading"
    >
      <AppSearchBox
        v-if="!showFilter && !showRecent"
        v-model="monstieFilter.nameFilter"
      />

      <template
        v-if="history.hasRecentMonsties && !showFilter"
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
            v-if="monstieFilter.hasActiveSort"
            :caption="monstieFilter.activeSort.caption"
            filterTarget="/monsties/filter/"
            :sortOrder="monstieFilter.activeSort.order"
          />

          <AppFilterPill
            v-for="filter in monstieFilter.activeFilters"
            :key="filter.name"
            :caption="filter.value"
            filterTarget="/monsties/filter/"
            showRemove
            @remove="monstieFilter[filter.name] = null"
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
            v-if="monstieFilter.isGrouped && !showRecent"
            class="sticky top-12 z-10 flex items-center -mx-1 px-1 -mt-3 -mb-1 py-1 border-t bg-gray-300 border-gray-300 dark:bg-cool-700 dark:border-cool-700"
          >
            <FaIcon
              v-if="monstieFilter.sortKey === 'genus'"
              class="!w-6 text-gray-500 dark:text-cool-400"
              :icon="['fas', 'dna']"
            />

            <FaIcon
              v-if="monstieFilter.sortKey === 'habitat'"
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
              <MonstieListItem
                :monster="monster"
                :mode="monstieFilter.mode"
                class="box box-link px-1 overflow-hidden"
              />
            </NuxtLink>
          </div>
        </li>
      </ul>

      <MonsterNoResults v-if="monstieFilter.isEmpty && !showRecent">
        No monsties found
      </MonsterNoResults>
    </main>
  </div>
</template>

<script>
  import { mapStores } from 'pinia';
  import useMonstieFilter from '~/stores/monstieFilter';
  import { makeHead } from '~/services/utils';

  export default {
    name: 'PageMonsties',

    provide: {
      useFilterStore: useMonstieFilter,
    },

    beforeRouteEnter(to, from, next) {
      next((vm) => {
        vm.leaving = false;
        vm.$useHistoryStore().lastList = 'monsties';
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
        title: 'Monster Buddy - Monstie List For Monster Hunter Stories 2',
        description:
          'Easily find all monsties in their natural habitats and check on retreat conditions, their attack types and stats',
        canonical: 'https://monsterbuddy.app/monsties/',
      });
    },

    computed: {
      ...mapStores(useMonstieFilter),

      history() {
        return this.$useHistoryStore();
      },

      showFilter() {
        // workaround for <NuxtChild> not playing nice with <Nuxt keep-alive>
        return this.$route?.path === '/monsties/filter/';
      },

      showActiveFilters() {
        return (
          (this.monstieFilter.hasActiveSort ||
            this.monstieFilter.hasActiveFilters) &&
          !this.showRecent
        );
      },

      groupedMonsters() {
        if (this.showRecent) {
          return {
            all: this.history.recentMonsties,
          };
        }
        return this.monstieFilter.groupedMonsters;
      },

      heading() {
        if (this.showFilter) {
          return 'View Options';
        }
        if (this.showRecent) {
          return 'Recent Monsties';
        }
        return null;
      },

      fabTarget() {
        if (this.showFilter) {
          return '/monsties/';
        }
        return '/monsties/filter/';
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
