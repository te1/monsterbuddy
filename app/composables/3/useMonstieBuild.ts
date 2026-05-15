import type { MonstieBuildEntity } from '~/services/3/localDb';
import { liveQuery } from 'dexie';
import { db } from '~/services/3/localDb';
import { MonstieBuild } from '~/services/3/monstieBuilds';

export function useMonstieBuild(id: MaybeRefOrGetter<string | undefined>) {
  return useLiveQuery(
    async (currentId) => {
      if (!currentId) {
        return undefined;
      }

      const value = await db.monstieBuilds.get(currentId);
      return value ? MonstieBuild.fromEntity(value) : undefined;
    },
    () => toValue(id),
    'useMonstieBuild'
  );
}

export function useMonstieBuildEntity(id: MaybeRefOrGetter<string | undefined>) {
  return useLiveQuery<MonstieBuildEntity | undefined, string | undefined>(
    (currentId) => {
      if (!currentId) {
        return undefined;
      }

      return db.monstieBuilds.get(currentId);
    },
    () => toValue(id),
    'useMonstieBuildEntity'
  );
}

export function useLiveQuery<T, TDependency = void>(
  query: (dependency: TDependency) => T | Promise<T>,
  getDependency: () => TDependency = () => undefined as TDependency,
  errorLabel = 'useLiveQuery'
) {
  const data = ref<T | undefined>(undefined);
  const pending = ref(false);

  watchEffect((onCleanup) => {
    data.value = undefined;

    if (!import.meta.client) {
      return;
    }

    const dependency = getDependency();
    pending.value = true;

    const subscription = liveQuery(() => query(dependency)).subscribe({
      next(value) {
        data.value = value;
        pending.value = false;
      },
      error(err) {
        console.error(`${errorLabel} error`, err);
        pending.value = false;
      },
    });

    onCleanup(() => {
      subscription.unsubscribe();
    });
  });

  return { data, pending };
}
