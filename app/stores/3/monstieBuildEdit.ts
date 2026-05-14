import type { UpdateSpec } from 'dexie';
import type { MonstieBuildEntity } from '~/services/3/localDb';
import { computedAsync, useLocalStorage } from '@vueuse/core';
import { MonstieBuild, MonstieBuildSchema } from '~/services/3/monstieBuilds';
import { db } from '~/services/3/localDb';
import useMonstieBuildHistoryStore from './monstieBuildHistoryStore';

const useMonstieBuildEdit = defineStore('s3/monstieBuildEdit', () => {
  const history = useMonstieBuildHistoryStore();

  const build = useLocalStorage<MonstieBuild | undefined>('s3/monstieBuildEdit', undefined, {
    listenToStorageChanges: false,
    serializer: {
      read: (value) => {
        if (!value) {
          return undefined;
        }
        const data = JSON.parse(value);
        const result = MonstieBuildSchema.safeParse(data);

        if (!result.success) {
          console.error('Failed to parse MonstieBuild data', result.error);
          return undefined;
        }

        return MonstieBuild.fromData(result.data);
      },
      write: (value) => (value ? JSON.stringify(value.toData()) : ''),
    },
  });

  const isSavedRefreshKey = ref(0);
  const isSaved = computedAsync(async () => {
    unref(isSavedRefreshKey); // force the computed to re-run after saving

    const entity = build.value?.id ? await db.monstieBuilds.get(build.value.id) : undefined;

    return entity != null;
  }, false);

  const isPinnedRefreshKey = ref(0);
  const isPinned = computedAsync(async () => {
    unref(isPinnedRefreshKey); // force the computed to re-run after saving

    return build.value?.id ? await history.isBuildPinned(build.value.id) : false;
  }, false);

  async function save(): Promise<void> {
    if (!build.value) {
      return;
    }

    const oldEntity = await db.monstieBuilds.get(build.value.id);

    const now = new Date();

    const changes: UpdateSpec<MonstieBuildEntity> = {
      id: build.value.id,
      name: build.value.name,
      monstieSlug: build.value.monstieSlug,
      data: build.value.toData(),
      dataHash: await build.value.getContentHash({ ignoreId: true }),
      updatedAt: now,
      viewedAt: now,
    };

    if (oldEntity == null) {
      changes.pinned = 0;
      changes.createdAt = now;
    }

    await db.monstieBuilds.upsert(build.value.id, changes);

    isSavedRefreshKey.value++; // force the computed to re-run after saving
  }

  async function togglePin(): Promise<void> {
    if (build.value?.id) {
      await history.togglePinnedBuild(build.value.id);
      isPinnedRefreshKey.value++; // force the computed to re-run after saving
    }
  }

  return {
    build,
    isSaved,
    isPinned,
    save,
    togglePin,
  };
});

export default useMonstieBuildEdit;
