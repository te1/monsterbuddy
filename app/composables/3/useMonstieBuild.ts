import type { MonstieBuildEntity } from '~/services/3/localDb';
import { liveQuery } from 'dexie';
import { db } from '~/services/3/localDb';
import { MonstieBuild } from '~/services/3/monstieBuilds';

export function useMonstieBuild(id: MaybeRefOrGetter<string | undefined>) {
  const pending = ref(false);
  const data = ref<MonstieBuild | undefined>(undefined);

  watchEffect((onCleanup) => {
    data.value = undefined;

    if (!import.meta.client) {
      return;
    }

    pending.value = true;

    const currentId = toValue(id);

    if (!currentId) {
      pending.value = false;
      return;
    }

    const subscription = liveQuery(() => db.monstieBuilds.get(currentId)).subscribe({
      next(value) {
        data.value = value ? MonstieBuild.fromEntity(value) : undefined;
        pending.value = false;
      },
      error(err) {
        console.error(`useMonstieBuild(${currentId}) error`, err);
        pending.value = false;
      },
    });

    onCleanup(() => {
      subscription.unsubscribe();
    });
  });

  return { data, pending };
}

export function useMonstieBuildEntity(id: MaybeRefOrGetter<string | undefined>) {
  const pending = ref(false);
  const data = ref<MonstieBuildEntity | undefined>(undefined);

  watchEffect((onCleanup) => {
    data.value = undefined;

    if (!import.meta.client) {
      return;
    }

    pending.value = true;

    const currentId = toValue(id);

    if (!currentId) {
      pending.value = false;
      return;
    }

    const subscription = liveQuery(() => db.monstieBuilds.get(currentId)).subscribe({
      next(value) {
        data.value = value;
        pending.value = false;
      },
      error(err) {
        console.error(`useMonstieBuildEntity(${currentId}) error`, err);
        pending.value = false;
      },
    });

    onCleanup(() => {
      subscription.unsubscribe();
    });
  });

  return { data, pending };
}

/*
export function useLiveQuery<T>(query: () => T | Promise<T>) {
  const data = ref<T | undefined>(undefined);

  watchEffect((onCleanup) => {
    data.value = undefined;

    if (!import.meta.client) {
      return;
    }

    const subscription = liveQuery(query).subscribe({
      next(value) {
        data.value = value;
      },
      error(err) {
        console.error('useLiveQuery error', err);
      },
    });

    onCleanup(() => {
      subscription.unsubscribe();
    });
  });

  return data;
}
*/
