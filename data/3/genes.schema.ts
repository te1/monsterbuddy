import { z } from 'zod';
import { AttackTypeSchema, ElementTypeSchema } from '~~/data/shared.schema';

export const GeneTypeSchema = z.union([AttackTypeSchema, z.literal('all')]).nullable();
export type GeneType = z.infer<typeof GeneTypeSchema>;

export const GeneElementSchema = z.union([ElementTypeSchema, z.literal('all')]);
export type GeneElement = z.infer<typeof GeneElementSchema>;

export const GeneSizeSchema = z.enum(['none', 'S', 'M', 'L', 'XL', '+']);
export type GeneSize = z.infer<typeof GeneSizeSchema>;

export const SkillTargetSchema = z.enum([
  'allAllies',
  'allEnemies',
  'randomEnemy',
  'singleEnemy',
  'user',
]);
export type SkillTarget = z.infer<typeof SkillTargetSchema>;

export const SkillAilmentTypeSchema = z.enum([
  'blastblight',
  'bleeding',
  'burn',
  'darkness',
  'noxiousPoison',
  'paralysis',
  'poison',
  'severePoison',
  'sleep',
  'stun',
]);
export type SkillAilmentType = z.infer<typeof SkillAilmentTypeSchema>;

export const SkillBuffTypeSchema = z.enum([
  'attackUp',
  'criticalUp',
  'defenseUp',
  'dodgeUp',
  'dragonAttackUp',
  'fireAttackUp',
  'fireDefenseUp',
  'iceAttackUp',
  'inflictRateUp',
  'speedUp',
  'staminaRegenUp',
  'thunderAttackUp',
  'waterAttackUp',
  'wyvernfellUp',
  'regenerate',
]);
export type SkillBuffType = z.infer<typeof SkillBuffTypeSchema>;

export const SkillDebuffTypeSchema = z.enum([
  'accuracyDown',
  'attackDown',
  'defenseDown',
  'dragonDefenseDown',
  'evasionDown',
  'speedDown',
  'thunderDefenseDown',
  'wyvernsoulDefenseDown',
]);
export type SkillDebuffType = z.infer<typeof SkillDebuffTypeSchema>;

export const SkillEffectTypeSchema = z.enum([
  //
  '1HitKo',
]);
export type SkillEffectType = z.infer<typeof SkillEffectTypeSchema>;

export const GeneSchema = z.object({
  name: z.string(),
  slug: z.string(),
  size: GeneSizeSchema,
  type: GeneTypeSchema,
  element: GeneElementSchema,
  active: z.boolean(),
  stamina: z.number().nullable(),
  power: z.number().nullable(),
  wyvernfell: z.number().nullable(),
  description: z.string(),
  target: SkillTargetSchema.nullable(),
  breath: z.boolean(),
  eggSkill: z.boolean(),
  ailment: z.array(SkillAilmentTypeSchema),
  buff: z.array(SkillBuffTypeSchema),
  debuff: z.array(SkillDebuffTypeSchema),
  effect: z.array(SkillEffectTypeSchema),
  sizes: z.array(z.string()),
});
export type Gene = z.infer<typeof GeneSchema>;
