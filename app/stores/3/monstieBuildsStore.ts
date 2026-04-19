import type { UpdateSpec } from 'dexie';
import type { MonstieBuildEntity } from '~/services/3/localDb';
import { MonstieBuild } from '~/services/3/monstieBuilds';
import { customAlphabet } from 'nanoid';
import { liveQuery } from 'dexie';
import { db } from '~/services/3/localDb';
import { useRouter } from 'vue-router';

const useMonstieBuildsStore = defineStore('s3/monstieBuilds', () => {
  const router = useRouter();

  const recentEntities = ref<MonstieBuildEntity[]>([]);
  const pinnedEntities = ref<MonstieBuildEntity[]>([]);

  let recentSub: { unsubscribe(): void } | null = null;
  let pinnedSub: { unsubscribe(): void } | null = null;

  // -- state
  const currentBuild = ref<MonstieBuild | undefined>(undefined);

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

  async function setCurrentBuild(id: string): Promise<MonstieBuild | undefined> {
    if (currentBuild.value?.id === id) {
      return currentBuild.value;
    }

    const data = await getBuild(id);

    currentBuild.value = data;

    return data;
  }

  async function newBuild(): Promise<MonstieBuild> {
    if (currentBuild.value?.isEmpty()) {
      // we have a new empty build already so just reuse it
      return currentBuild.value;
    }

    const id = generateLocalId();
    const now = new Date();

    let data = new MonstieBuild(id);
    const dataHash = await data.getContentHash({ ignoreId: true });

    const entity = await db.monstieBuilds.get({ dataHash });

    if (entity != null) {
      // we have a build with the same content already so just reuse it
      data = MonstieBuild.fromEntity(entity);
    } else {
      const entity: MonstieBuildEntity = {
        id,
        name: data.name,
        monstieSlug: data.monstieSlug,
        data,
        dataHash,
        pinned: 0,
        createdAt: now,
        updatedAt: now,
        viewedAt: now,
      };

      await db.monstieBuilds.put(entity);
    }

    currentBuild.value = data;

    await router.push(`/3/builder/monstie/edit#${data.id}`);

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
    // -- state
    currentBuild,

    // -- getters
    recentBuilds,
    hasRecentBuilds,
    pinnedBuilds,
    hasPinnedBuilds,

    // -- actions
    subscribe,
    unsubscribe,
    setCurrentBuild,
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

const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'; // no _-
const nanoid = customAlphabet(alphabet, 11);

function generateLocalId(): string {
  return '_' + nanoid();
}
