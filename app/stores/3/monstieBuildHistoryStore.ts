import type { MonstieBuildEntity } from '~/services/3/localDb';
import { liveQuery } from 'dexie';
import { db } from '~/services/3/localDb';
import { MonstieBuild } from '~/services/3/monstieBuilds';

type Subscription = { unsubscribe(): void };

const useMonstieBuildHistoryStore = defineStore('s3/monstieBuildHistory', () => {
  // -- state
  const allEntities = ref<MonstieBuildEntity[]>([]);
  const allLoaded = ref(false);

  const recentEntities = ref<MonstieBuildEntity[]>([]);
  const recentLoaded = ref(false);

  const pinnedEntities = ref<MonstieBuildEntity[]>([]);
  const pinnedLoaded = ref(false);

  let allSub: Subscription | null = null;
  let recentSub: Subscription | null = null;
  let pinnedSub: Subscription | null = null;

  // -- getters
  const allBuilds = computed<MonstieBuild[]>(() => {
    return allEntities.value.map((entity) => MonstieBuild.fromEntity(entity));
  });

  const recentBuilds = computed<MonstieBuild[]>(() => {
    return recentEntities.value.map((entity) => MonstieBuild.fromEntity(entity));
  });

  const hasRecentBuilds = computed(() => {
    return recentBuilds.value.length > 0;
  });

  const pinnedBuilds = computed<MonstieBuild[]>(() => {
    return pinnedEntities.value.map((entity) => MonstieBuild.fromEntity(entity));
  });

  const hasPinnedBuilds = computed(() => {
    return pinnedBuilds.value.length > 0;
  });

  // -- actions
  function subscribe() {
    if (allSub == null) {
      allSub = liveQuery(() => db.monstieBuilds.toArray()).subscribe({
        next(value) {
          allEntities.value = value;
          allLoaded.value = true;
        },
        error(err) {
          console.error(`useMonstieBuildHistoryStore allSub error`, err);
        },
      });
    }

    const maxRecentItems = 50;

    if (recentSub == null) {
      recentSub = liveQuery(() =>
        db.monstieBuilds.orderBy('viewedAt').reverse().limit(maxRecentItems).toArray()
      ).subscribe({
        next(value) {
          recentEntities.value = value;
          recentLoaded.value = true;
        },
        error(err) {
          console.error(`useMonstieBuildHistoryStore recentSub error`, err);
        },
      });
    }

    if (pinnedSub == null) {
      pinnedSub = liveQuery(() => db.monstieBuilds.where('pinned').equals(1).toArray()).subscribe({
        next(value) {
          pinnedEntities.value = value;
          pinnedLoaded.value = true;
        },
        error(err) {
          console.error(`useMonstieBuildHistoryStore pinnedSub error`, err);
        },
      });
    }
  }

  function unsubscribe() {
    allSub?.unsubscribe();
    allSub = null;

    recentSub?.unsubscribe();
    recentSub = null;

    pinnedSub?.unsubscribe();
    pinnedSub = null;
  }

  async function addRecentBuild(id: string): Promise<void> {
    const entity = await db.monstieBuilds.get(id);

    if (!entity) {
      return;
    }

    await db.monstieBuilds.update(entity.id, { viewedAt: new Date() });
  }

  async function isBuildPinned(id: string): Promise<boolean> {
    const entity = await db.monstieBuilds.get(id);

    return entity?.pinned === 1;
  }

  async function togglePinnedBuild(id: string): Promise<void> {
    const entity = await db.monstieBuilds.get(id);

    if (!entity) {
      return;
    }

    await db.monstieBuilds.update(entity.id, {
      pinned: entity.pinned === 1 ? 0 : 1,
    });
  }

  return {
    // -- state
    allLoaded,
    recentLoaded,
    pinnedLoaded,

    // -- getters
    allBuilds,
    recentBuilds,
    hasRecentBuilds,
    pinnedBuilds,
    hasPinnedBuilds,

    // -- actions
    subscribe,
    unsubscribe,
    addRecentBuild,
    isBuildPinned,
    togglePinnedBuild,
  };
});

export default useMonstieBuildHistoryStore;
