<template>
  <div>
    <AppTopBar
      :showBack="showFilter"
      backFallback="/monsties/"
      :heading="heading"
    >
      <AppSearchBox
        v-if="!showFilter"
        v-model="monstieFilter.nameFilter"
      />
    </AppTopBar>

    <NuxtLink :to="fabTarget">
      <AppFloatingButton :title="fabTitle">
        <FaIcon :icon="fabIcon" />
      </AppFloatingButton>
    </NuxtLink>

    <NuxtChild v-show="!leaving && showFilter" />

    <main v-show="leaving || !showFilter">
      <div
        v-if="monstieFilter.hasActiveSort || monstieFilter.hasActiveFilters"
        class="fixed z-10 w-full inset-x-0 top-12 mt-1"
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

      <ul :class="{ 'mt-8': monstieFilter.hasActiveSort || monstieFilter.hasActiveFilters }">
        <li
          v-for="(group, key) in monstieFilter.groupedMonsters"
          :key="key"
          class="mt-3 first:mt-0 "
        >
          <div
            v-if="monstieFilter.isGrouped"
            class="flex items-center mb-1"
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

          <div class="grid gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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

      <MonsterNoResults v-if="monstieFilter.isEmpty">
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

      showFilter() {
        // workaround for <NuxtChild> not playing nice with <Nuxt keep-alive>
        return this.$route?.path === '/monsties/filter/';
      },

      heading() {
        if (this.showFilter) {
          return 'View Options';
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
