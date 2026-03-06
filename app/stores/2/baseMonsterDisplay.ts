import type { FilterStore } from './baseMonsterFilter';

export type DisplayItem<DisplayType> = {
  value: DisplayType;
  label: string;
};

export function makeMonsterDisplayStore<DisplayType extends string = string>(
  storeId: string,
  initial: DisplayType,
  fallback: DisplayType,
  displayToLabel: (display: DisplayType) => string,
  all: () => DisplayType[],
  updateFilter?: (display: DisplayType, filter: FilterStore) => void
) {
  return defineStore(storeId, {
    state() {
      return {
        current: initial,
      };
    },

    getters: {
      all,

      items(): DisplayItem<DisplayType>[] {
        return this.all.map((display) => {
          return {
            value: display,
            label: displayToLabel(display),
          };
        });
      },

      next(): DisplayType {
        const current = this.current as DisplayType;
        const currentIndex = this.all.indexOf(current);
        const nextIndex = (currentIndex + 1) % this.all.length;

        return this.all[nextIndex] ?? fallback;
      },
    },

    actions: {
      setCurrent(value: DisplayType, filter: FilterStore) {
        this.current = value as typeof this.current;

        if (updateFilter) {
          updateFilter(value, filter);
        }
      },
    },
  });
}

export type DisplayStore = ReturnType<ReturnType<typeof makeMonsterDisplayStore>>;
