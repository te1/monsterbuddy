import type { UpdateSpec } from 'dexie';
import type { MonstieBuildEntity } from '~/services/3/localDb';
import { useLocalStorage } from '@vueuse/core';
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
        try {
          const data = JSON.parse(value);
          const result = MonstieBuildSchema.safeParse(data);

          if (!result.success) {
            console.error('Failed to parse MonstieBuild data', result.error);
            return undefined;
          }

          return MonstieBuild.fromData(result.data);
        } catch (error) {
          console.error('Failed to parse MonstieBuild data', error);
          return undefined;
        }
      },
      write: (value) => (value ? JSON.stringify(value.toData()) : ''),
    },
  });

  const isSaved = computed(() => (build.value?.id ? history.hasBuild(build.value.id) : false));

  const isPinned = computed(() =>
    build.value?.id
      ? history.pinnedBuilds.some((pinnedBuild) => pinnedBuild.id === build.value?.id)
      : false
  );

  const hasChanges = ref(false);

  const savedRefreshKey = ref(0);
  watch(
    [build, isSaved, savedRefreshKey],
    async (_new, _old, onCleanup) => {
      // stop the callback if watch triggers again
      let cancelled = false;
      onCleanup(() => {
        cancelled = true;
      });

      try {
        if (!build.value) {
          hasChanges.value = false;
          return;
        }

        if (build.value.isEmpty()) {
          hasChanges.value = false;
          return;
        }

        const newHash = await build.value.getContentHash({ ignoreIds: true });
        if (cancelled) {
          return;
        }

        if (build.value.forkedFrom?.startsWith('_')) {
          const parentEntity = await db.monstieBuilds.get(build.value.forkedFrom);
          if (cancelled) {
            return;
          }
          if (parentEntity?.dataHash === newHash) {
            hasChanges.value = false;
            return;
          }
        }

        if (!isSaved.value) {
          hasChanges.value = true;
          return;
        }

        const oldEntity = await db.monstieBuilds.get(build.value.id);
        if (cancelled) {
          return;
        }

        if (oldEntity == null) {
          hasChanges.value = true;
          return;
        }

        hasChanges.value = oldEntity.dataHash !== newHash;
      } catch (error) {
        if (!cancelled) {
          console.error('Failed to recompute hasChanges', error);
        }
      }
    },
    { deep: true, immediate: true }
  );

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
      dataHash: await build.value.getContentHash({ ignoreIds: true }),
      updatedAt: now,
      viewedAt: now,
    };

    if (oldEntity == null) {
      changes.pinned = 0;
      changes.createdAt = now;
    }

    await db.monstieBuilds.upsert(build.value.id, changes);

    savedRefreshKey.value++; // force the computed to re-run after saving
  }

  async function togglePin(): Promise<void> {
    if (build.value?.id) {
      await history.togglePinnedBuild(build.value.id);
    }
  }

  return {
    build,
    isSaved,
    isPinned,
    hasChanges,
    save,
    togglePin,
  };
});

export default useMonstieBuildEdit;
