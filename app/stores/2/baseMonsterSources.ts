import type { FilterStore } from './baseMonsterFilter';

export type SourceItem<SourceType> = {
  value: SourceType;
  label: string;
};

export function makeMonsterSourcesStore<SourceType extends string = string>(
  storeId: string,
  initial: SourceType,
  fallback: SourceType,
  sourceToLabel: (source: SourceType) => string,
  all: () => SourceType[],
  updateFilter?: (source: SourceType, filter: FilterStore) => void
) {
  return defineStore(storeId, {
    state() {
      return {
        current: initial,
      };
    },

    getters: {
      all,

      items(): SourceItem<SourceType>[] {
        return this.all.map((source) => {
          return {
            value: source,
            label: sourceToLabel(source),
          };
        });
      },

      next(): SourceType {
        const current = this.current as SourceType;
        const currentIndex = this.all.indexOf(current);
        const nextIndex = (currentIndex + 1) % this.all.length;

        return this.all[nextIndex] ?? fallback;
      },
    },

    actions: {
      setCurrent(value: SourceType, filter?: FilterStore) {
        this.current = value as typeof this.current;

        if (updateFilter && filter != null) {
          updateFilter(value, filter);
        }
      },
    },
  });
}

export type SourcesStore = ReturnType<ReturnType<typeof makeMonsterSourcesStore>>;
