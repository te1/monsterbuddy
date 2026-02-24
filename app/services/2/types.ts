export type LocationType = 'catavanStand' | 'coopQuest' | 'eldersLair';

export type RelationType =
  | 'subspecies'
  | 'subspeciesOf'
  | 'deviant'
  | 'deviantOf'
  | 'color'
  | 'element';

export type ElementType = 'none' | 'fire' | 'water' | 'thunder' | 'ice' | 'dragon';

export type CoopQuestType = 'explore' | 'slay' | 'time';

export type RidingActionType = 'utility' | 'explore' | 'search';

export type AttackType = 'power' | 'speed' | 'technical';

export type GrowthType = 'quick' | 'regular' | 'slow';

export type GenusType =
  | 'Amphibian'
  | 'Bird Wyvern'
  | 'Brute Wyvern'
  | 'Carapaceon'
  | 'Elder Dragon'
  | 'Fanged Beast'
  | 'Fanged Wyvern'
  | 'Flying Wyvern'
  | 'Herbivore'
  | 'Leviathan'
  | 'Lynian'
  | 'Neopteron'
  | 'Piscine Wyvern'
  | 'Temnoceran';

export type MonsterRarityType = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export type CoopQuestRarityType = 5 | 8 | 9;

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

export type MonsterLocation = {
  type: LocationType;
  main?: string;
  sub?: string;
};

export type MonsterRelation = {
  type: RelationType;
  monster: string;
};

export type MonsterData = {
  attackPatterns?: Record<string, string>;
  parts?: Record<string, string[]>;
  elementalWeakness?: ElementType;
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

export type MonstieStats = {
  base: MonstieBaseStats;
  attack: MonstieElementStats;
  defense: MonstieElementStats;
  bestAttack: MonstieStatEntry;
  bestDefense: MonstieStatEntry;
  worstDefense?: MonstieStatEntry;
  otherDefense?: MonstieStatEntry;
};

export type MonstieData = {
  attackType: AttackType;
  growth?: GrowthType;
  ridingActions: string[];
  kinshipSkill?: string;
  eggColors: EggColor[];
  retreat?: string;
  stats?: MonstieStats;
  attackElement: ElementType;
};

export type Monster = {
  no: number;
  name: string;
  genus: GenusType;
  habitat: string;
  locations: MonsterLocation[];
  rarity?: MonsterRarityType;
  monster?: MonsterData;
  hatchable?: boolean;
  monstie?: MonstieData;
  slug: string;
  related?: MonsterRelation[];
};

export type CoopQuest = {
  type: CoopQuestType;
  rarity: CoopQuestRarityType;
  name: string;
  slug: string;
};

export type Habitat = {
  name: string;
  sortOrder: number;
};

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

export type RidingAction = {
  name: string;
  description: string;
  type: RidingActionType;
  slug: string;
};
