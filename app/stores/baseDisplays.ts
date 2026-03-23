export type DisplayItem<DisplayType> = {
  value: DisplayType;
  label: string;
};

type DisplaysState<DisplayType extends string, ExtraStateType extends object> = {
  current: DisplayType;
} & ExtraStateType;

export function makeDisplaysStore<
  DisplayType extends string = string,
  ExtraStateType extends object = object,
>(
  storeId: string,
  initial: DisplayType,
  fallback: DisplayType,
  displayToLabel: (display: DisplayType) => string,
  all: (this: DisplaysState<DisplayType, ExtraStateType>) => DisplayType[],
  extraState?: ExtraStateType
) {
  return defineStore(storeId, {
    state() {
      return {
        current: initial,
        ...extraState,
      } as DisplaysState<DisplayType, ExtraStateType>;
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
      setCurrent(value: DisplayType) {
        this.current = value as typeof this.current;
      },
    },
  });
}

export type DisplaysStore = ReturnType<ReturnType<typeof makeDisplaysStore>>;
