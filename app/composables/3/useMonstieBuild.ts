import { liveQuery } from 'dexie';
import type { MonstieBuildEntity } from '~/services/3/localDb';
import { MonstieBuild } from '~/services/3/monstieBuilds';
import { db } from '~/services/3/localDb';

export function useMonstieBuild(id: MaybeRefOrGetter<string | undefined>) {
  const data = ref<MonstieBuild | undefined>(undefined);

  watchEffect((onCleanup) => {
    data.value = undefined;

    if (!import.meta.client) {
      return;
    }

    const currentId = toValue(id);

    if (!currentId) {
      return;
    }

    const subscription = liveQuery(() => db.monstieBuilds.get(currentId)).subscribe({
      next(value) {
        data.value = value ? MonstieBuild.fromEntity(value) : undefined;
      },
      error(err) {
        console.error(`useMonstieBuild(${currentId}) error`, err);
      },
    });

    onCleanup(() => {
      subscription.unsubscribe();
    });
  });

  return data;
}

export function useMonstieBuildEntity(id: MaybeRefOrGetter<string | undefined>) {
  const data = ref<MonstieBuildEntity | undefined>(undefined);

  watchEffect((onCleanup) => {
    data.value = undefined;

    if (!import.meta.client) {
      return;
    }

    const currentId = toValue(id);

    if (!currentId) {
      return;
    }

    const subscription = liveQuery(() => db.monstieBuilds.get(currentId)).subscribe({
      next(value) {
        data.value = value;
      },
      error(err) {
        console.error(`useMonstieBuildEntity(${currentId}) error`, err);
      },
    });

    onCleanup(() => {
      subscription.unsubscribe();
    });
  });

  return data;
}
