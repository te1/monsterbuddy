import type { Monster } from '~/services/2/types';
import type { Mode } from './base';
import { pull } from 'es-toolkit/array';
import { useLocalStorage } from '@vueuse/core';
import { skipHydrate } from 'pinia';
import useMonsterFilter from './monsterFilter';
import useMonstieFilter from './monstieFilter';
import useEggFilter from './eggFilter';
import { monsters, monstersBySlug, monsties, getMonstersByHatchable } from '~/services/2/data';

const useHistoryStore = defineStore('s2/history', () => {
  // -- state
  const lastList = ref<'monsters' | 'monsties' | 'eggs' | null>(null);
  const recentMonsterSlugs = useLocalStorage<string[]>('s2/history/recentMonsterSlugs', []);
  const pinnedMonsterSlugs = useLocalStorage<string[]>('s2/history/pinnedMonsterSlugs', []);
  const pinnedMonstieSlugs = useLocalStorage<string[]>('s2/history/pinnedMonstieSlugs', []);
  const pinnedEggSlugs = useLocalStorage<string[]>('s2/history/pinnedEggSlugs', []);

  // -- getters
  const lastListStore = computed(() => {
    switch (lastList.value) {
      case 'monsters':
        return useMonsterFilter();

      case 'monsties':
        return useMonstieFilter();

      case 'eggs':
        return useEggFilter();

      default:
        return null;
    }
  });

  const lastListMode = computed(() => {
    return lastListStore.value?.mode;
  });

  const shouldShowMonstie = (monster: Monster) => {
    return lastList.value === 'monsties' && monster.hatchable;
  };

  const shouldShowEgg = (monster: Monster) => {
    return lastList.value === 'eggs' && monster.hatchable;
  };

  const listModeSmart = (showMonstie: boolean, showEgg: boolean, mode?: Mode) => {
    let store;

    if (showMonstie) {
      store = useMonstieFilter();
    } else if (showEgg) {
      store = useEggFilter();
    } else {
      store = useMonsterFilter();
    }

    mode ??= store.mode;

    if (store.autoSwitchModes.includes(mode)) {
      return mode;
    }
    return undefined;
  };

  const lastListModeSmart = (monster: Monster) => {
    const showMonstie = shouldShowMonstie(monster);
    const showEgg = shouldShowEgg(monster);

    return listModeSmart(showMonstie, showEgg);
  };

  const recentMonsters = computed<Monster[]>(() => {
    return recentMonsterSlugs.value
      .map((slug) => monstersBySlug.get(slug))
      .filter((monster): monster is Monster => monster != null);
  });

  const hasRecentMonsters = computed(() => {
    return recentMonsters.value.length > 0;
  });

  const recentMonsties = computed(() => {
    return getMonstersByHatchable(true, recentMonsters.value);
  });

  const hasRecentMonsties = computed(() => {
    return recentMonsties.value.length > 0;
  });

  const pinnedMonsters = computed(() => {
    return monsters.filter((monster) => {
      return pinnedMonsterSlugs.value.includes(monster.slug);
    });
  });

  const hasPinnedMonsters = computed(() => {
    return pinnedMonsters.value.length > 0;
  });

  const isMonsterPinned = (slug: string) => {
    return pinnedMonsterSlugs.value.includes(slug);
  };

  const pinnedMonsties = computed(() => {
    return monsties.filter((monster) => {
      return pinnedMonstieSlugs.value.includes(monster.slug);
    });
  });

  const hasPinnedMonsties = computed(() => {
    return pinnedMonsties.value.length > 0;
  });

  const isMonstiePinned = (slug: string) => {
    return pinnedMonstieSlugs.value.includes(slug);
  };

  const pinnedEggs = computed(() => {
    return monsties.filter((monster) => {
      return pinnedEggSlugs.value.includes(monster.slug);
    });
  });

  const hasPinnedEggs = computed(() => {
    return pinnedEggs.value.length > 0;
  });

  const isEggPinned = (slug: string) => {
    return pinnedEggSlugs.value.includes(slug);
  };

  // -- actions
  function addRecentMonster(slug: string) {
    const maxRecentItems = 50;

    pull(recentMonsterSlugs.value, [slug]);

    while (recentMonsterSlugs.value.length >= maxRecentItems) {
      recentMonsterSlugs.value.pop();
    }

    recentMonsterSlugs.value.unshift(slug);
  }

  function togglePinnedMonster(slug: string) {
    if (isMonsterPinned(slug)) {
      pull(pinnedMonsterSlugs.value, [slug]);
    } else {
      pinnedMonsterSlugs.value.unshift(slug);
    }
  }

  function togglePinnedMonstie(slug: string) {
    if (isMonstiePinned(slug)) {
      pull(pinnedMonstieSlugs.value, [slug]);
    } else {
      pinnedMonstieSlugs.value.unshift(slug);
    }
  }

  function togglePinnedEgg(slug: string) {
    if (isEggPinned(slug)) {
      pull(pinnedEggSlugs.value, [slug]);
    } else {
      pinnedEggSlugs.value.unshift(slug);
    }
  }

  return {
    // -- state
    lastList,
    recentMonsterSlugs: skipHydrate(recentMonsterSlugs),
    pinnedMonsterSlugs: skipHydrate(pinnedMonsterSlugs),
    pinnedMonstieSlugs: skipHydrate(pinnedMonstieSlugs),
    pinnedEggSlugs: skipHydrate(pinnedEggSlugs),

    // -- getters
    lastListStore,
    lastListMode,
    shouldShowMonstie,
    shouldShowEgg,
    lastListModeSmart,
    listModeSmart,
    recentMonsters,
    hasRecentMonsters,
    recentMonsties,
    hasRecentMonsties,
    pinnedMonsters,
    hasPinnedMonsters,
    isMonsterPinned,
    pinnedMonsties,
    hasPinnedMonsties,
    isMonstiePinned,
    pinnedEggs,
    hasPinnedEggs,
    isEggPinned,

    // -- actions
    addRecentMonster,
    togglePinnedMonster,
    togglePinnedMonstie,
    togglePinnedEgg,
  };
});

export default useHistoryStore;
