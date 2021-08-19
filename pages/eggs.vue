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

    <NuxtChild v-show="showFilter" />

    <main v-show="!showFilter">
      <ul>
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

      <div
        v-if="eggFilter.isEmpty"
        class="box flex flex-col items-center py-4 space-y-4"
      >
        <span class="text-2xl text-gray-400 font-semibold">
          No eggs found
        </span>

        <FaIcon
          class="!w-20 !h-20 text-gray-400"
          :icon="['far', 'frown']"
        />

        <div
          class="text-lg text-brand-500 hover:text-brand-400 active:text-gray-500"
          @click="eggFilter.reset"
        >
          Reset filter
        </div>
      </div>
    </main>
  </div>
</template>

<script>
  import { mapStores } from 'pinia';
  import { makeMonsterFilterStore } from '~/services/stores';
  import { monsties } from '~/services/data';
  import { makeHead } from '~/services/utils';

  const useEggFilter = makeMonsterFilterStore(
    'eggFilter',
    monsties,
    {
      sortKey: 'no',
    },
    {
      state: {
        mode: 'compact',
      },
    }
  );

  export default {
    name: 'PageEggs',

    provide: {
      useFilterStore: useEggFilter,
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
          return 'Sort And Filter';
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
          return 'Apply filter';
        }
        return 'Sort and filter';
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
