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
  'Attack Up',
  'Non-Elemental Attack Up',
  'Fire Attack Up',
  'Water Attack Up',
  'Thunder Attack Up',
  'Ice Attack Up',
  'Dragon Attack Up',
  'Power Charge',
  'Speed Up',
  'Critical Up',
  'Wyvernfell Up',
  'Blood Rite',
  'Lock-On',
  'Ailment Inflict Rate Up',
  'Defense Up',
  'Fire Defense Up',
  'Dodge Up',
  'Guard',
  'Regenerate',
  'Stamina Regen Up',
  'Burn Effect',
  'Blast Effect',
  'Paralysis Effect',
]);
export type SkillBuffType = z.infer<typeof SkillBuffTypeSchema>;

export const SkillBuffSizeSchema = z.enum([
  //
  'S',
  'M',
  'L',
  'stacking',
]);
export type SkillBuffSize = z.infer<typeof SkillBuffSizeSchema>;

export const SkillBuffTurnsSchema = z.enum([
  //
  '1',
  '2',
  '3',
  'thisTurn',
  'nextTurn',
  'next2Turn',
]);
export type SkillBuffTurns = z.infer<typeof SkillBuffTurnsSchema>;

export const SkillBuffSchema = z.object({
  type: SkillBuffTypeSchema,
  size: SkillBuffSizeSchema.optional(),
  target: SkillTargetSchema,
  turns: SkillBuffTurnsSchema.optional(),
});
export type SkillBuff = z.infer<typeof SkillBuffSchema>;

export const SkillDebuffTypeSchema = z.enum([
  'Defense Down',
  'Thunder Defense Down',
  'Dragon Defense Down',
  'Wyvernsoul Defense Down',
  'Dodge Down',
  'Evasion Down',
  'Attack Down',
  'Accuracy Down',
  'Speed Down',
]);
export type SkillDebuffType = z.infer<typeof SkillDebuffTypeSchema>;

export const SkillDebuffSchema = z.object({
  type: SkillDebuffTypeSchema,
  size: SkillBuffSizeSchema.optional(),
  target: SkillTargetSchema,
  turns: SkillBuffTurnsSchema.optional(),
});
export type SkillDebuff = z.infer<typeof SkillDebuffSchema>;

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

export const SkillDetailValueSchema = z.object({
  type: z.enum([
    'critRate',
    'evasionRate',
    'staminaRecovery',
    'startingStamina',
    'maxHpRecovery',
    'kinship',
    'wyvernfell',
    'accuracy',
    'ailmentChance',
    'debuffExtension',
    'effectChance',
  ]),
  value: z.number(),
});
export type SkillDetailValue = z.infer<typeof SkillDetailValueSchema>;

export const SkillDetailFactorSchema = z.object({
  type: z.enum([
    'damageDone',
    'damageTaken',
    'staminaCost',
    'maxHp',
    'kinshipGeneration',
    'wyvernsoulDamage',
  ]),
  element: GeneElementSchema.optional(),
  value: z.number(),
  op: z.enum(['multiplier', 'additive']),
});
export type SkillDetailFactor = z.infer<typeof SkillDetailFactorSchema>;

export const SkillDetailSchema = z.discriminatedUnion('type', [
  SkillDetailValueSchema,
  SkillDetailFactorSchema,
]);
export type SkillDetail = z.infer<typeof SkillDetailSchema>;

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
  ailments: z.array(SkillAilmentTypeSchema).optional(),
  buffs: z.array(SkillBuffSchema).optional(),
  debuffs: z.array(SkillDebuffSchema).optional(),
  effects: z.array(SkillEffectTypeSchema).optional(),
  details: z.array(SkillDetailSchema).optional(),
  sizes: z.array(z.string()).optional(),
});
export type Gene = z.infer<typeof GeneSchema>;
