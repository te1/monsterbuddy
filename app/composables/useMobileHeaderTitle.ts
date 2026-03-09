export function useMobileHeaderTitle() {
  const value = useState<string | null>('mobileHeader', () => null);
  const owner = useState<string | null>('mobileHeaderOwner', () => null);

  function bind(source: MaybeRefOrGetter<string | null>) {
    const currentOwner = crypto.randomUUID();

    watchEffect(() => {
      // prevent a disposed page from clearing a newer page's header
      owner.value = currentOwner;
      value.value = toValue(source);
    });

    onScopeDispose(() => {
      if (owner.value === currentOwner) {
        value.value = null;
        owner.value = null;
      }
    });
  }

  return {
    value: readonly(value),
    bind,
  };
}
