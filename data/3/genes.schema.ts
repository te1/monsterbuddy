import { z } from 'zod';
import { AttackTypeSchema, ElementTypeSchema } from '~~/data/shared.schema';

export const GeneTypeSchema = z.union([AttackTypeSchema, z.literal('all')]).nullable();
export type GeneType = z.infer<typeof GeneTypeSchema>;

export const GeneElementSchema = z.union([ElementTypeSchema, z.literal('all')]);
export type GeneElement = z.infer<typeof GeneElementSchema>;

export const GeneSizeSchema = z.enum(['none', 'S', 'M', 'L', 'XL', '-', '+']);
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
  '1HitKo',
  'explodeBlastblight',
  'evade',
  'stun',
  'spam', // inflicting greater damage with repeated use
  'crit', // high chance of landing a critical hit
  'recoil', // causes recoil damage
  'nextTurn', // increases damage dealt on the next turn
  'leech', // recovers HP by an amount relative to damage dealt
  'lowAccuracy', // low hit rate
  'chaser', // targets with ... / affected by ... take more damage
  'priority', // high chance to strike first
  'procBlastblight', // attacks become capable of inflicting Blastblight
  'procBurn', // attacks become capable of inflicting Burn
  'procParalysis', // attacks become capable of inflicting Paralysis
]);
export type SkillEffectType = z.infer<typeof SkillEffectTypeSchema>;

export const GeneSchema = z.object({
  name: z.string(),
  baseName: z.string().optional(),
  slug: z.string(),
  size: GeneSizeSchema,
  type: GeneTypeSchema,
  element: GeneElementSchema,
  active: z.boolean().optional(),
  stamina: z.number().optional(),
  power: z.number().optional(),
  wyvernfell: z.number().optional(),
  pps: z.number().optional(), // power per stamina
  wps: z.number().optional(), // wyvernfell per stamina
  description: z.string(),
  target: SkillTargetSchema.optional(),
  breath: z.boolean().optional(),
  eggSkill: z.boolean().optional(),
  ailment: z.array(SkillAilmentTypeSchema).optional(),
  buff: z.array(SkillBuffTypeSchema).optional(),
  debuff: z.array(SkillDebuffTypeSchema).optional(),
  effect: z.array(SkillEffectTypeSchema).optional(),
  sizes: z.array(z.string()).optional(),
});
export type Gene = z.infer<typeof GeneSchema>;
