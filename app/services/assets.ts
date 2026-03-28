export async function loadAsset<T extends string>(
  assets: Record<string, () => Promise<T>>,
  key: string,
  fallbackKey?: string
) {
  const loader = assets[key] ?? (fallbackKey ? assets[fallbackKey] : undefined);

  return loader ? await loader() : null;
}

export function rebuildAssetPath(assetUrl: string | null, newPath: string) {
  if (!assetUrl) {
    return null;
  }

  // get file name from URL
  // '_nuxt/assets/3/monster-icon/Anjanath.png' -> 'Anjanath.png'
  const rawFileName = assetUrl.split(/[\\/]/).pop()?.split(/[?#]/)[0];

  if (!rawFileName) {
    return null;
  }

  // drop hash from file name
  // '_nuxt/Green%20Plesioth.DCmPguMi.png' -> 'Green%20Plesioth.png'
  const parts = rawFileName.split('.');
  let fileName = parts.length >= 2 ? `${parts[0]}.${parts.at(-1)}` : rawFileName;

  try {
    fileName = decodeURIComponent(fileName);
  } catch {
    // nope
  }

  // add new file name to new path
  return fileName ? `${newPath}/${encodeURIComponent(fileName)}` : null;
}

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
    elementIcons['/assets/icon/element-unknown.svg']
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
