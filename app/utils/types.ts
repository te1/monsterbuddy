export type { AttackType, ElementType, GenusType, WeaponType } from '~~/data/shared.schema';

export type GameType = 'none' | 'mhst1' | 'mhst2' | 'mhst3';

export type SortOrder = 'asc' | 'desc';

export const allAttackTypes: readonly AttackType[] = ['power', 'speed', 'technical'];
