import { z } from 'zod';
import { AttackTypeSchema, ElementTypeSchema } from '../shared.schema';
import { RegionNameSchema } from './regions.schema';

export const EggPowerRankSchema = z.enum(['S', 'A', 'B']);
export type EggPowerRank = z.infer<typeof EggPowerRankSchema>;

export const EggPowerSizeSchema = z.enum(['-', '+']);
export type EggPowerSize = z.infer<typeof EggPowerSizeSchema>;

export const EggPowerRequirementSchema = z.union([
  z.object({ type: AttackTypeSchema }),
  z.object({ element: ElementTypeSchema }),
]);
export type EggPowerRequirement = z.infer<typeof EggPowerRequirementSchema>;

export const EggPowerDetailDetailSchema = z.object({
  type: z.enum([
    'damageDone',
    'damageTaken',
    'staminaRecovery',
    'kinship',
    'kinshipGeneration',
    'kinshipPercent',
    'extraTurns',
  ]),
  attackType: AttackTypeSchema.nullable().optional(),
  condition: z.enum(['headToHead']).optional(),
  value: z.number(),
  op: z.enum(['multiplier', 'additive']).optional(),
});
export type EggPowerDetailDetail = z.infer<typeof EggPowerDetailDetailSchema>;

export const EggPowerDetailSchema = z.object({
  name: z.string(),
  description: z.string(),
  size: EggPowerSizeSchema,
  requirements: z.array(EggPowerRequirementSchema).optional(),
  details: z.array(EggPowerDetailDetailSchema).optional(),
});
export type EggPowerDetail = z.infer<typeof EggPowerDetailSchema>;

export const EggPowerSchema = z.object({
  name: z.string(),
  slug: z.string(),
  region: RegionNameSchema,
  rank: EggPowerRankSchema,
  details: z.array(EggPowerDetailSchema),
});
export type EggPower = z.infer<typeof EggPowerSchema>;
