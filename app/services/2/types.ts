// -- monsters --------------------------------------------

export type RelationType =
  | 'subspecies'
  | 'subspeciesOf'
  | 'deviant'
  | 'deviantOf'
  | 'color'
  | 'element';

export type LocationType = 'catavanStand' | 'coopQuest' | 'eldersLair';

export type MonsterRarityType = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export type GrowthType = 'quick' | 'regular' | 'slow';

export type EggColor =
  | 'black'
  | 'blue'
  | 'brown'
  | 'gray'
  | 'green'
  | 'orange'
  | 'pink'
  | 'purple'
  | 'red'
  | 'white'
  | 'yellow';

export type Monster = {
  no: number;
  name: string;
  slug: string;
  genus: GenusType;
  habitat: string;
  related?: MonsterRelation[];
  locations: MonsterLocation[];
  rarity: MonsterRarityType;
  monster?: MonsterData;
  hatchable?: boolean;
  monstie?: MonstieData;
};

export type MonsterRelation = {
  type: RelationType;
  monster: string;
};
export type MonsterLocation = {
  type: LocationType;
  main?: string;
  sub?: string;
};

export type MonsterData = {
  attackPatterns?: Record<string, AttackType>;
  parts?: Record<string, WeaponType[]>;
  elementalWeakness?: ElementType;
};

export type MonstieData = {
  attackType: AttackType;
  attackElement: ElementType;
  growth?: GrowthType;
  stats?: MonstieStats;
  ridingActions: string[];
  kinshipSkill?: string;
  eggColors: EggColor[];
  retreat?: string;
};

export type MonstieStats = {
  base: MonstieBaseStats;
  attack: MonstieElementStats;
  defense: MonstieElementStats;
  bestAttack: MonstieStatEntry;
  bestDefense: MonstieStatEntry;
  worstDefense?: MonstieStatEntry;
  otherDefense?: MonstieStatEntry;
};

export type MonstieBaseStats = {
  maxHp: number;
  speed: number;
  recovery: number;
  critRate: number;
};

export type MonstieElementStats = Record<ElementType, number>;

export type MonstieStatEntry = {
  element: ElementType;
  value: number;
};

// -- riding actions --------------------------------------

export type RidingActionType = 'utility' | 'explore' | 'search';

export type RidingAction = {
  name: string;
  description: string;
  type: RidingActionType;
  slug: string;
};

// -- coop quests------------------------------------------

export type CoopQuestType = 'explore' | 'slay' | 'time';

export type CoopQuestRarityType = 5 | 8 | 9;

export type CoopQuest = {
  type: CoopQuestType;
  rarity: CoopQuestRarityType;
  name: string;
  slug: string;
};

// -- habitats --------------------------------------------

export type Habitat = {
  name: string;
  sortOrder: number;
};

// -- catavan stands --------------------------------------

export type CatavanStand = {
  name: string;
  zone: string;
  sortOrder: number;
};

export type CatavanStandWithDetails = {
  name: string;
  slug: string;
  zone?: string;
  sortOrder: number;
};
