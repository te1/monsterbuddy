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
  'unlocks',
  'unlockedBy',
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
  hp: z.number(),
  defense: z.number(),
  attack: z.number(),
  speed: z.number(),
  crit: z.number().optional(),
  stamina: z.number().optional(),
  recovery: z.number().optional(),
  startingStamina: z.number().optional(),
  rawRecovery: z.number().optional(),
  wyvernfell: z.number().optional(),
  rawSpeed: z.number().optional(),
  rawCrit: z.number().optional(),
  bulk: z.number().optional(),
  total: z.number().optional(),
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
  elementalResistance: z.record(ElementTypeSchema, z.number()).optional(),
  ailmentResistance: z.record(AilmentTypeSchema, z.number()).optional(),
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

export const MonstieGenesSchema = z.object({
  innate: z.array(z.string()),
  sRank: z.string(),
  special: z.array(z.string()).optional(),
  eggSkillGroup: z.string(),
  passiveGroup: z.string(),
});
export type MonstieGenes = z.infer<typeof MonstieGenesSchema>;

const MonstieDataSchema = z.object({
  attack: AttackTypeSchema,
  ridingActions: z.array(z.string()),
  kinshipSkill: z.string().optional(),
  eggColors: z.array(EggColorSchema).optional(),
  genes: MonstieGenesSchema.optional(),
});
export type MonstieData = z.infer<typeof MonstieDataSchema>;

export const MonsterSchema = z.object({
  name: z.string(),
  slug: z.string(),
  genus: GenusTypeSchema,
  tags: z.array(MonsterTagSchema).optional(),
  related: z.array(MonsterRelationSchema).optional(),
  rank: z.number(),
  flavor: z.record(z.string(), z.string()).optional(),
  element: ElementTypeSchema.optional(),
  stats: MonsterStatsSchema.optional(),
  monster: MonsterDataSchema.optional(),
  hatchable: z.boolean().optional(),
  monstie: MonstieDataSchema.optional(),
});
export type Monster = z.infer<typeof MonsterSchema>;
