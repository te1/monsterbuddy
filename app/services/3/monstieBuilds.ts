import type { EggPower, Gene, Monster, Region } from './types';
import { eggPowersBySlug, monstersBySlug, regionsBySlug } from './data';
import { genesBySlug } from './genes';
import type { MonstieBuildEntity } from './localDb';

export class MonstieBuild {
  id: string;
  name: string | null = null;
  description: string | null = null;
  monstieSlug: string | null = null;
  geneSlugs: string[] = [];
  eggPowerSlugs: string[] = [];
  dualElement: ElementType | null = null;
  /** for stat increases */
  regionSlug: string | null = null;

  constructor(id: string) {
    this.id = id;
  }

  static fromEntity(entity: MonstieBuildEntity): MonstieBuild {
    const build = new MonstieBuild(entity.data.id);

    build.name = entity.data.name;
    build.description = entity.data.description;
    build.monstieSlug = entity.data.monstieSlug;
    build.geneSlugs = Array.from(entity.data.geneSlugs);
    build.eggPowerSlugs = Array.from(entity.data.eggPowerSlugs);
    build.dualElement = entity.data.dualElement;
    build.regionSlug = entity.data.regionSlug;

    return build;
  }

  get nameWithFallback(): string {
    if (this.name) {
      return this.name;
    }

    if (this.monstie) {
      return `${this.monstie.name} Build`;
    }

    return this.id;
  }

  get monstie(): Monster | undefined {
    return this.monstieSlug ? monstersBySlug.get(this.monstieSlug) : undefined;
  }

  get genes(): Gene[] {
    return this.geneSlugs.map((slug) => genesBySlug.get(slug)).filter((gene) => gene !== undefined);
  }

  get eggPowers(): EggPower[] {
    return this.eggPowerSlugs
      .map((slug) => eggPowersBySlug.get(slug))
      .filter((eggPower) => eggPower !== undefined);
  }

  get region(): Region | undefined {
    return this.regionSlug ? regionsBySlug.get(this.regionSlug) : undefined;
  }
}

/*
import { z } from 'zod';
import { ElementTypeSchema } from '~~/data/shared.schema';

export const MonstieBuildSchema = z.object({
  id: z.nanoid(),
  name: z.string().nullable(),
  description: z.string().nullable(),
  monstieSlug: z.string().nullable(),
  geneSlugs: z.array(z.string()),
  eggPowerSlugs: z.array(z.string()),
  dualElement: ElementTypeSchema.nullable(),
  regionSlug: z.string().nullable(), // for stat increases
  pinned: z.boolean(),
  createdAt: isoDatetimeToDate,
  updatedAt: isoDatetimeToDate,
  hash: z.string().nullable(),
});
export type MonstieBuild = z.infer<typeof MonstieBuildSchema>;

function buildToStableJson(build: MonstieBuild): string {
  const encoded = z.encode(MonstieBuildSchema, build);
  const stable = sortKeys(encoded);

  return JSON.stringify(stable);
}

export async function getBuildHash(build: MonstieBuild): Promise<string> {
  const json = buildToStableJson(build);

  return await hash(json);
}
*/
