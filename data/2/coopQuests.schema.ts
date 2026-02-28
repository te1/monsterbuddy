import { z } from 'zod';

export const CoopQuestTypeSchema = z.enum([
  //
  'explore',
  'slay',
  'time',
]);
export type CoopQuestType = z.infer<typeof CoopQuestTypeSchema>;

export const CoopQuestRarityTypeSchema = z.union([
  //
  z.literal(5),
  z.literal(8),
  z.literal(9),
]);
export type CoopQuestRarityType = z.infer<typeof CoopQuestRarityTypeSchema>;

export const CoopQuestSchema = z.object({
  type: CoopQuestTypeSchema,
  rarity: CoopQuestRarityTypeSchema,
  name: z.string(),
  slug: z.string(),
});
export type CoopQuest = z.infer<typeof CoopQuestSchema>;
