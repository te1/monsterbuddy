<template>
  <div>
    <AppTopBar
      :showBack="showFilter"
      backFallback="/eggs/"
      :heading="heading"
    >
      <AppSearchBox
        v-if="!showFilter"
        v-model="eggFilter.nameFilter"
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
        v-if="eggFilter.hasActiveFilters"
        class="fixed z-10 w-full inset-x-0 top-12 mt-1"
      >
        <div class="container px-4 flex flex-wrap gap-1 items-center justify-center">
          <AppFilterPill
            v-for="filter in eggFilter.activeFilters"
            :key="filter.name"
            :caption="filter.value"
            filterTarget="/eggs/filter/"
            @remove="eggFilter[filter.name] = null"
          />
        </div>
      </div>

      <ul :class="{ 'mt-8': eggFilter.hasActiveFilters }">
        <li
          v-for="(group, key) in eggFilter.groupedMonsters"
          :key="key"
          class="mt-3 first:mt-0 "
        >
          <div
            v-if="eggFilter.isGrouped"
            class="flex items-center mb-1"
          >
            <FaIcon
              v-if="eggFilter.sortKey === 'genus'"
              class="!w-6 text-gray-500 dark:text-cool-400"
              :icon="['fas', 'dna']"
            />

            <FaIcon
              v-if="eggFilter.sortKey === 'habitat'"
              class="!w-6 text-gray-500 dark:text-cool-400"
              :icon="['fas', 'map-marker-alt']"
            />

            <div
              class="font-semibold mb-1"
              v-text="key"
            />
          </div>

          <div
            v-if="eggFilter.mode === 'compact'"
            class="grid gap-3 grid-cols-2"
          >
            <NuxtLink
              v-for="monster in group"
              :key="monster.no"
              :to="`/monsters/${monster.slug}/`"
            >
              <EggGridItem
                :monster="monster"
                class="box box-link px-1 overflow-hidden"
              />
            </NuxtLink>
          </div>

          <div
            v-else
            class="grid gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            <NuxtLink
              v-for="monster in group"
              :key="monster.no"
              :to="`/monsters/${monster.slug}/`"
            >
              <EggListItem
                :monster="monster"
                :mode="eggFilter.mode"
                class="box box-link px-1 overflow-hidden"
              />
            </NuxtLink>
          </div>
        </li>
      </ul>

      <MonsterNoResults v-if="eggFilter.isEmpty">
        No eggs found
      </MonsterNoResults>
    </main>
  </div>
</template>

<script>
  import { mapStores } from 'pinia';
  import useEggFilter from '~/stores/eggFilter';
  import { makeHead } from '~/services/utils';

  export default {
    name: 'PageEggs',

    provide: {
      useFilterStore: useEggFilter,
    },

    beforeRouteEnter(to, from, next) {
      next((vm) => {
        vm.leaving = false;
        vm.$useHistoryStore().lastList = 'eggs';
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
        title: 'Monster Buddy - Egg List For Monster Hunter Stories 2',
        description:
          'Visual guide with images for all egg patterns for every hatchable monstie with search, sorting and filtering',
        canonical: 'https://monsterbuddy.app/eggs/',
      });
    },

    computed: {
      ...mapStores(useEggFilter),

      showFilter() {
        // workaround for <NuxtChild> not playing nice with <Nuxt keep-alive>
        return this.$route?.path === '/eggs/filter/';
      },

      heading() {
        if (this.showFilter) {
          return 'View Options';
        }
        return null;
      },

      fabTarget() {
        if (this.showFilter) {
          return '/eggs/';
        }
        return '/eggs/filter/';
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
