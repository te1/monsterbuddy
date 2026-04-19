import type { MonstieBuild } from '~/services/3/monstieBuilds';
import { liveQuery } from 'dexie';
import { db } from '~/services/3/localDb';

export function useMonstieBuild(id: string) {
  const data = ref<MonstieBuild | undefined>(undefined);

  const subscription = liveQuery(() => db.monstieBuilds.get(id)).subscribe({
    next(value) {
      data.value = value?.data;
    },
    error(err) {
      console.error(`useMonstieBuild(${id}) error`, err);
    },
  });

  onScopeDispose(() => {
    subscription.unsubscribe();
  });

  return data;
}
