import { z } from 'zod';
import { ElementTypeSchema } from '../shared.schema';

export const EggSkillGroupSchema = z.object({
  gene: z.string(),
  element: ElementTypeSchema,
});
export type EggSkillGroup = z.infer<typeof EggSkillGroupSchema>;

export const EggSkillGroupsSchema = z.record(z.string(), z.array(EggSkillGroupSchema));
export type EggSkillGroups = z.infer<typeof EggSkillGroupsSchema>;

export const GeneGroupsSchema = z.record(z.string(), z.array(z.string()));
export type GeneGroups = z.infer<typeof GeneGroupsSchema>;

export const GeneSetsSchema = z.record(z.string(), z.array(z.string()));
export type GeneSets = z.infer<typeof GeneSetsSchema>;

export const GeneSourcesSchema = z.object({
  eggSkillGroups: EggSkillGroupsSchema,
  geneGroups: GeneGroupsSchema,
  geneSets: GeneSetsSchema,
});
export type GeneSources = z.infer<typeof GeneSourcesSchema>;
