export function useMobileHeaderOverride() {
  const value = useState<string | null>('mobileHeader', () => null);
  const owner = useState<string | null>('mobileHeaderOwner', () => null);

  function bind(source: MaybeRefOrGetter<string | null>) {
    const currentOwner = crypto.randomUUID();
    let stop: ReturnType<typeof watchEffect> | undefined;

    onMounted(() => {
      stop = watchEffect(() => {
        // Route-owned titles should come from route meta during SSR.
        // This composable is for client-side interactive overrides.
        owner.value = currentOwner;
        value.value = toValue(source);
      });
    });

    onScopeDispose(() => {
      stop?.();

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
