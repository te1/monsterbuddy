import { z } from 'zod';
import { AttackTypeSchema, ElementTypeSchema, GenusTypeSchema } from '~~/data/shared.schema';

export const RelationTypeSchema = z.enum([
  'subspecies',
  'subspeciesOf',
  'deviant',
  'deviantOf',
  'color',
  'ex',
  'exOf',
]);
export type RelationType = z.infer<typeof RelationTypeSchema>;

const MonsterRelationSchema = z.object({
  type: RelationTypeSchema,
  monster: z.string(),
});
export type MonsterRelation = z.infer<typeof MonsterRelationSchema>;

export const LocationTypeSchema = z.enum([
  //
  'primary',
  'secondary',
  'den',
  'towerOfIllusion',
  'subQuest',
]);
export type LocationType = z.infer<typeof LocationTypeSchema>;

const MonsterLocationSchema = z.object({
  type: LocationTypeSchema,
  main: z.string(),
  sub: z.string().optional(),
  rank: z.enum(['low', 'high']).optional(),
  lateGame: z.boolean().optional(),
  lateGameHint: z.string().optional(),
});
export type MonsterLocation = z.infer<typeof MonsterLocationSchema>;

export const MonsterRarityTypeSchema = z.union([
  z.literal(1),
  z.literal(2),
  z.literal(3),
  z.literal(4),
  z.literal(5),
  z.literal(6),
  z.literal(7),
  z.literal(8),
  z.literal(9),
]);
export type MonsterRarityType = z.infer<typeof MonsterRarityTypeSchema>;

const MonsterDataSchema = z.object({
  tendency: AttackTypeSchema,
  elementalAtk: z.array(ElementTypeSchema).optional(),
  elementalResistance: z.array(ElementTypeSchema).optional(),
  elementalWeakness: z.array(ElementTypeSchema).optional(),
});
export type MonsterData = z.infer<typeof MonsterDataSchema>;

export const GrowthTypeSchema = z.enum([
  //
  'quick',
  'regular',
  'slow',
]);
export type GrowthType = z.infer<typeof GrowthTypeSchema>;

const MonstieBaseStatsSchema = z.object({
  hp: z.number(),
  atk: z.number(),
  def: z.number(),
  spd: z.number(),
});
export type MonstieBaseStats = z.infer<typeof MonstieBaseStatsSchema>;

const MonstieElementStatsSchema = z.record(z.string(), z.number());
export type MonstieElementStats = z.infer<typeof MonstieElementStatsSchema>;

const MonstieStatEntrySchema = z.object({
  element: ElementTypeSchema,
  value: z.number(),
  elements: z.array(z.string()).optional(),
});
export type MonstieStatEntry = z.infer<typeof MonstieStatEntrySchema>;

const MonstieStatsSchema = z.object({
  base: MonstieBaseStatsSchema,
  attack: MonstieElementStatsSchema,
  defense: MonstieElementStatsSchema,
  bestAttack: MonstieStatEntrySchema.optional(),
  bestDefense: MonstieStatEntrySchema.optional(),
  worstDefense: MonstieStatEntrySchema.optional(),
});
export type MonstieStats = z.infer<typeof MonstieStatsSchema>;

const RetreatSchema = z.object({
  paintball: z.enum(['low', 'medium', 'high']),
  condition: z.string(),
  chance: z.enum(['low', 'medium', 'high']),
});
export type Retreat = z.infer<typeof RetreatSchema>;

const MonstieDataSchema = z.object({
  tendency: AttackTypeSchema.optional(),
  attackElement: ElementTypeSchema.optional(),
  growth: GrowthTypeSchema.optional(),
  stats: MonstieStatsSchema.optional(),
  ridingActions: z.array(z.string()).optional(),
  kinshipSkill: z.string().optional(),
  eggVariants: z.number(),
  retreat: RetreatSchema.optional(),
});
export type MonstieData = z.infer<typeof MonstieDataSchema>;

export const MonsterSchema = z.object({
  no: z.number().optional(),
  name: z.string(),
  slug: z.string(),
  genus: GenusTypeSchema,
  habitat: z.string(),
  related: z.array(MonsterRelationSchema).optional(),
  locations: z.array(MonsterLocationSchema).optional(),
  rarity: MonsterRarityTypeSchema.optional(),
  description: z.string().optional(),
  monster: MonsterDataSchema.optional(),
  hatchable: z.boolean().optional(),
  monstie: MonstieDataSchema.optional(),
});
export type Monster = z.infer<typeof MonsterSchema>;
