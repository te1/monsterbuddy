const attackTypeIcons = import.meta.glob<string>('~/assets/icon/type-*.svg', {
  eager: true,
  import: 'default',
});

export function getAttackTypeIconUrl(attackType?: AttackType) {
  return (
    attackTypeIcons[`/assets/icon/type-${attackType}.svg`] ??
    attackTypeIcons['/assets/icon/type-unknown.svg']
  );
}

const elementIcons = import.meta.glob<string>('~/assets/icon/element-*.svg', {
  eager: true,
  import: 'default',
});

export function getElementIconUrl(element?: ElementType) {
  return (
    elementIcons[`/assets/icon/element-${element}.svg`] ??
    elementIcons['/assets/icon/type-unknown.svg']
  );
}

const weaponTypeIcons = import.meta.glob<string>('~/assets/icon/weapon-*.svg', {
  eager: true,
  import: 'default',
});

export function getWeaponTypeIconUrl(weaponType: WeaponType, ineffective = false) {
  return (
    (ineffective
      ? weaponTypeIcons[`/assets/icon/weapon-${weaponType}-ineffective.svg`]
      : weaponTypeIcons[`/assets/icon/weapon-${weaponType}.svg`]) ??
    weaponTypeIcons['/assets/icon/weapon-unknown.svg']
  );
}
