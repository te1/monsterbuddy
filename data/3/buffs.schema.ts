import { z } from 'zod';
import {
  GeneElementSchema,
  SkillBuffSizeSchema,
  SkillBuffTypeSchema,
  SkillDebuffTypeSchema,
} from './genes.schema';

export const SkillBuffDetailSchema = z.object({
  size: SkillBuffSizeSchema.exclude(['stacking']).optional(),
  type: z.enum(['damageDone', 'critRate', 'maxHpRecovery']),
  element: GeneElementSchema.optional(),
  value: z.number(),
  op: z.enum(['multiplier', 'additive']).optional(),
});

export const SkillBuffSchema = z.object({
  type: SkillBuffTypeSchema,
  description: z.string().optional(),
  details: z.array(SkillBuffDetailSchema).optional(),
});
export type SkillBuff = z.infer<typeof SkillBuffSchema>;

export const SkillDebuffSchema = z.object({
  type: SkillDebuffTypeSchema,
  description: z.string().optional(),
  details: z.array(SkillBuffDetailSchema).optional(),
});
export type SkillDebuff = z.infer<typeof SkillDebuffSchema>;

export const BuffsAndDebuffsSchema = z.object({
  buffs: z.array(SkillBuffSchema),
  debuffs: z.array(SkillDebuffSchema),
});
export type BuffsAndDebuffs = z.infer<typeof BuffsAndDebuffsSchema>;
