const attackTypeIcons = import.meta.glob<string>('~/assets/icon/type-*.svg', {
  eager: true,
  import: 'default',
});

export function getAttackTypeIconUrl(attackType?: AttackType) {
  return (
    attackTypeIcons[`/assets/icon/type-${attackType}.svg`] ??
    attackTypeIcons['/assets/icon/type-uknown.svg']
  );
}
