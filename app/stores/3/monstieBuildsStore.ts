import type { UpdateSpec } from 'dexie';
import type { MonstieBuildEntity } from '~/services/3/localDb';
import { MonstieBuild } from '~/services/3/monstieBuilds';
import { nanoid } from 'nanoid';
import { liveQuery } from 'dexie';
import { db } from '~/services/3/localDb';

const useMonstieBuildsStore = defineStore('s3/monstieBuilds', () => {
  const recentEntities = ref<MonstieBuildEntity[]>([]);
  const pinnedEntities = ref<MonstieBuildEntity[]>([]);

  let recentSub: { unsubscribe(): void } | null = null;
  let pinnedSub: { unsubscribe(): void } | null = null;

  // -- getters
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
    const maxRecentItems = 50;

    if (recentSub == null) {
      recentSub = liveQuery(() =>
        db.monstieBuilds.orderBy('viewedAt').reverse().limit(maxRecentItems).toArray()
      ).subscribe({
        next(value) {
          recentEntities.value = value;
        },
        error(err) {
          console.error(`useMonstieBuildsStore recentSub error`, err);
        },
      });
    }

    if (pinnedSub == null) {
      pinnedSub = liveQuery(() => db.monstieBuilds.where('pinned').equals(1).toArray()).subscribe({
        next(value) {
          pinnedEntities.value = value;
        },
        error(err) {
          console.error(`useMonstieBuildsStore pinnedSub error`, err);
        },
      });
    }
  }

  function unsubscribe() {
    recentSub?.unsubscribe();
    recentSub = null;

    pinnedSub?.unsubscribe();
    pinnedSub = null;
  }

  async function newBuild(): Promise<MonstieBuild> {
    const id = nanoid();
    const now = new Date();

    const data = new MonstieBuild(id);

    const entity: MonstieBuildEntity = {
      id,
      name: data.name,
      monstieSlug: data.monstieSlug,
      data,
      pinned: 0,
      createdAt: now,
      updatedAt: now,
      viewedAt: now,
    };

    await db.monstieBuilds.put(entity);

    return data;
  }

  async function saveBuild(build: MonstieBuild): Promise<void> {
    const now = new Date();

    const changes: UpdateSpec<MonstieBuildEntity> = {
      id: build.id,
      name: build.name,
      monstieSlug: build.monstieSlug,
      data: build,
      updatedAt: now,
      viewedAt: now,
    };

    await db.monstieBuilds.update(build.id, changes);
  }

  async function removeBuild(id: string): Promise<void> {
    await db.monstieBuilds.delete(id);
  }

  /** gets a static snapshot of the build, consider using the live query `useMonstieBuild` instead */
  async function getBuild(id: string): Promise<MonstieBuild | undefined> {
    const entity = await db.monstieBuilds.get(id);

    return entity ? MonstieBuild.fromEntity(entity) : undefined;
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
    // -- getters
    recentBuilds,
    hasRecentBuilds,
    pinnedBuilds,
    hasPinnedBuilds,

    // -- actions
    subscribe,
    unsubscribe,
    newBuild,
    saveBuild,
    removeBuild,
    getBuild,
    addRecentBuild,
    isBuildPinned,
    togglePinnedBuild,
  };
});

export default useMonstieBuildsStore;
