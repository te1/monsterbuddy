import { z } from 'zod';
import {
  AttackTypeSchema,
  ElementTypeSchema,
  GenusTypeSchema,
  WeaponTypeSchema,
} from '../shared.schema';

export const MonsterTagSchema = z.enum([
  'subspecies',
  'deviant',
  'feral',
  'invasive',
  'calamitous',
  'endangered',
  'mutation',
]);
export type MonsterTag = z.infer<typeof MonsterTagSchema>;

export const RelationTypeSchema = z.enum([
  'subspecies',
  'subspeciesOf',
  'deviant',
  'deviantOf',
  'feral',
  'feralOf',
  'invasive',
  'invasiveOf',
  'honed',
  'honedOf',
  // 'story',
  // 'storyOf',
]);
export type RelationType = z.infer<typeof RelationTypeSchema>;

const MonsterRelationSchema = z.object({
  type: RelationTypeSchema,
  monster: z.string(),
});
export type MonsterRelation = z.infer<typeof MonsterRelationSchema>;

const MonsterStatsBaseSchema = z.object({
  hp: z.number().nullable(),
  defense: z.number().nullable(),
  attack: z.number().nullable(),
  speed: z.number().nullable(),
  crit: z.number().nullable(),
  stamina: z.number().nullable(),
  recovery: z.number().nullable(),
  startingStamina: z.number().nullable(),
  rawRecovery: z.number().nullable(),
  wyvernfell: z.number().nullable(),
  rawSpeed: z.number().nullable(),
  bulk: z.number().nullable(),
  total: z.number().nullable(),
});
export type MonsterStatsBase = z.infer<typeof MonsterStatsBaseSchema>;

const AilmentTypeSchema = z.enum([
  'poison',
  'burn',
  'paralysis',
  'sleep',
  'blastblight',
  'bleeding',
  'darkness',
]);
export type AilmentType = z.infer<typeof AilmentTypeSchema>;

const MonsterStatsSchema = z.object({
  base: MonsterStatsBaseSchema.optional(),
  elementalResistance: z.record(ElementTypeSchema, z.union([z.number(), z.null()])).optional(),
  ailmentResistance: z.record(AilmentTypeSchema, z.union([z.number(), z.null()])).optional(),
});
export type MonsterStats = z.infer<typeof MonsterStatsSchema>;

const MonsterStateSchema = z.object({
  attack: AttackTypeSchema,
  parts: z.record(z.string(), z.array(WeaponTypeSchema)).optional(),
});
export type MonsterState = z.infer<typeof MonsterStateSchema>;

const MonsterDataSchema = z.object({
  states: z.record(z.string(), MonsterStateSchema).optional(),
});
export type MonsterData = z.infer<typeof MonsterDataSchema>;

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
  attack: AttackTypeSchema.nullable(),
  ridingActions: z.array(z.string()),
  kinshipSkill: z.string().nullable(),
  eggColors: z.array(EggColorSchema).optional(),
});
export type MonstieData = z.infer<typeof MonstieDataSchema>;

export const MonsterSchema = z.object({
  name: z.string(),
  slug: z.string(),
  genus: GenusTypeSchema,
  tags: z.array(MonsterTagSchema),
  related: z.array(MonsterRelationSchema),
  rank: z.number().nullable(),
  flavor: z.record(z.string(), z.string()).optional(),
  element: ElementTypeSchema.nullable(),
  stats: MonsterStatsSchema.optional(),
  monster: MonsterDataSchema,
  hatchable: z.boolean(),
  monstie: MonstieDataSchema.optional(),
});
export type Monster = z.infer<typeof MonsterSchema>;
