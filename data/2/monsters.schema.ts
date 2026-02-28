import { z } from 'zod';
import {
  AttackTypeSchema,
  ElementTypeSchema,
  GenusTypeSchema,
  WeaponTypeSchema,
} from '../shared.schema';

export const RelationTypeSchema = z.enum([
  'subspecies',
  'subspeciesOf',
  'deviant',
  'deviantOf',
  'color',
  'element',
]);
export type RelationType = z.infer<typeof RelationTypeSchema>;

const MonsterRelationSchema = z.object({
  type: RelationTypeSchema,
  monster: z.string(),
});
export type MonsterRelation = z.infer<typeof MonsterRelationSchema>;

export const LocationTypeSchema = z.enum([
  'catavanStand',
  'coopQuest',
  'eldersLair',
  'subQuest',
  'superRareDen',
]);
export type LocationType = z.infer<typeof LocationTypeSchema>;

const MonsterLocationSchema = z.object({
  type: LocationTypeSchema,
  main: z.string(),
  sub: z.string().optional(),
  finalNest: z.boolean().optional(),
  srTicket: z.boolean().optional(),
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
]);
export type MonsterRarityType = z.infer<typeof MonsterRarityTypeSchema>;

const MonsterDataSchema = z.object({
  attackPatterns: z.record(z.string(), AttackTypeSchema),
  parts: z.record(z.string(), z.array(WeaponTypeSchema)),
  elementalWeakness: z
    .union([ElementTypeSchema, z.record(z.string(), ElementTypeSchema)])
    .nullable(),
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
  maxHp: z.number().nullable(),
  speed: z.number().nullable(),
  recovery: z.number().nullable(),
  critRate: z.number().nullable(),
});
export type MonstieBaseStats = z.infer<typeof MonstieBaseStatsSchema>;

const MonstieElementStatsSchema = z.record(ElementTypeSchema, z.union([z.number(), z.null()]));
export type MonstieElementStats = z.infer<typeof MonstieElementStatsSchema>;

const MonstieStatEntrySchema = z.object({
  element: ElementTypeSchema,
  value: z.number().nullable(),
});
export type MonstieStatEntry = z.infer<typeof MonstieStatEntrySchema>;

const MonstieStatsSchema = z.object({
  base: MonstieBaseStatsSchema,
  attack: MonstieElementStatsSchema,
  defense: MonstieElementStatsSchema,
  bestAttack: MonstieStatEntrySchema.optional(),
  bestDefense: MonstieStatEntrySchema.optional(),
  worstDefense: MonstieStatEntrySchema.optional(),
  otherDefense: MonstieStatEntrySchema.optional(),
});
export type MonstieStats = z.infer<typeof MonstieStatsSchema>;

export const EggColorSchema = z.enum([
  'black',
  'blue',
  'brown',
  'gray',
  'green',
  'orange',
  'pink',
  'purple',
  'red',
  'white',
  'yellow',
]);
export type EggColor = z.infer<typeof EggColorSchema>;

const MonstieDataSchema = z.object({
  attackType: AttackTypeSchema,
  attackElement: ElementTypeSchema,
  growth: GrowthTypeSchema,
  stats: MonstieStatsSchema,
  ridingActions: z.array(z.string()),
  kinshipSkill: z.string(),
  eggColors: z.array(EggColorSchema),
  retreat: z.string(),
});
export type MonstieData = z.infer<typeof MonstieDataSchema>;

export const MonsterSchema = z.object({
  no: z.number(),
  name: z.string(),
  slug: z.string(),
  genus: GenusTypeSchema,
  habitat: z.string(),
  related: z.array(MonsterRelationSchema),
  locations: z.array(MonsterLocationSchema),
  rarity: MonsterRarityTypeSchema,
  monster: MonsterDataSchema,
  hatchable: z.boolean(),
  monstie: MonstieDataSchema.optional(),
});
export type Monster = z.infer<typeof MonsterSchema>;
