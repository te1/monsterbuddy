import { z } from 'zod';
import { AttackTypeSchema, ElementTypeSchema } from '../shared.schema';
import { EggPowerRankSchema, RegionNameSchema } from './regions.schema';

export const EggPowerSizeSchema = z.enum(['-', '+']);
export type EggPowerSize = z.infer<typeof EggPowerSizeSchema>;

export const EggPowerRequirementSchema = z.union([
  z.object({ type: AttackTypeSchema }),
  z.object({ element: ElementTypeSchema }),
]);
export type EggPowerRequirement = z.infer<typeof EggPowerRequirementSchema>;

export const EggPowerDetailSchema = z.object({
  name: z.string(),
  description: z.string(),
  size: EggPowerSizeSchema,
  requirements: z.array(EggPowerRequirementSchema).optional(),
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
