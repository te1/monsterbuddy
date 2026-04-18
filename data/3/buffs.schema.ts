import { z } from 'zod';
import {
  GeneElementSchema,
  SkillBuffSizeSchema,
  SkillBuffTypeSchema,
  SkillDebuffTypeSchema,
} from './genes.schema';

export const BuffDetailTypeSchema = z.enum([
  'damageDone',
  'damageTaken',
  'critRate',
  'evasionRate',
  'accuracyRate',
  'maxHpRecovery',
  'rawSpeed',
  'rawStaminaRegen',
  'wyvernfell',
  'wyvernsoulDamageTaken',
  'leech',
  'ailmentInflictRate',
  'effectChance',
]);
export type BuffDetailType = z.infer<typeof BuffDetailTypeSchema>;

export const BuffDetailSchema = z.object({
  size: SkillBuffSizeSchema.exclude(['stacking']).optional(),
  type: BuffDetailTypeSchema,
  element: GeneElementSchema.optional(),
  value: z.number(),
  op: z.enum(['multiplier', 'additive']).optional(),
  label: z.string().optional(),
});
export type BuffDetail = z.infer<typeof BuffDetailSchema>;

export const BuffSchema = z.object({
  type: SkillBuffTypeSchema,
  description: z.string().optional(),
  details: z.array(BuffDetailSchema).optional(),
});
export type Buff = z.infer<typeof BuffSchema>;

export const DebuffSchema = z.object({
  type: SkillDebuffTypeSchema,
  description: z.string().optional(),
  details: z.array(BuffDetailSchema).optional(),
});
export type Debuff = z.infer<typeof DebuffSchema>;

export const BuffsAndDebuffsSchema = z.object({
  buffs: z.array(BuffSchema),
  debuffs: z.array(DebuffSchema),
});
export type BuffsAndDebuffs = z.infer<typeof BuffsAndDebuffsSchema>;
