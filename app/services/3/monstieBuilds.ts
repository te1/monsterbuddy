import type { EggPower, EggPowerRequirement, Gene, Monster, Region } from './types';
import type { MonstieBuildEntity } from './localDb';
import z from 'zod';
import { orderBy, uniqBy } from 'es-toolkit/array';
import { customAlphabet } from 'nanoid';
import { ElementTypeSchema } from '~~/data/shared.schema';
import { db } from './localDb';
import { eggPowersBySlug, monstersBySlug, regionsBySlug } from './data';
import { genesBySlug, getGeneSizeAsNumber } from './genes';

export type GeneIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
export type EggPowerIndex = 0 | 1 | 2;

export class MonstieBuild {
  id: string;
  forkedFrom: string | null = null;
  name: string | null = null;
  description: string | null = null;
  monstieSlug: string | null = null;
  geneSlugs: (string | null)[] = [null, null, null, null, null, null, null, null, null];
  eggPowerSlugs: (string | null)[] = [null, null, null];
  dualElement: ElementType | null = null;
  /** for stat increases */
  regionSlug: string | null = null;

  constructor(id: string) {
    this.id = id;
  }

  static fromData(data: MonstieBuildData): MonstieBuild {
    const build = new MonstieBuild(data.id);

    build.forkedFrom = data.forkedFrom ?? null; // handle legacy data
    build.name = data.name;
    build.description = data.description;
    build.monstieSlug = data.monstieSlug;
    build.geneSlugs = Array.from(data.geneSlugs);
    build.eggPowerSlugs = Array.from(data.eggPowerSlugs);
    build.dualElement = data.dualElement;
    build.regionSlug = data.regionSlug;

    return build;
  }

  static fromEntity(entity: MonstieBuildEntity): MonstieBuild {
    return MonstieBuild.fromData(entity.data);
  }

  static async new(): Promise<MonstieBuild> {
    const id = generateLocalId();
    return new MonstieBuild(id);
  }

  static async fork(sourceId: string): Promise<MonstieBuild | undefined> {
    const sourceEntity = await db.monstieBuilds.get(sourceId);

    if (!sourceEntity) {
      return;
    }

    const build = MonstieBuild.fromEntity(sourceEntity);
    build.id = generateLocalId();
    build.forkedFrom = sourceId;

    return build;
  }

  static async remove(id: string): Promise<void> {
    await db.monstieBuilds.delete(id);
  }

  get nameWithFallback(): string {
    if (this.name) {
      return this.name;
    }

    if (this.monstie) {
      return `${this.monstie.name} Build`;
    }

    return 'New Build';
  }

  get monstie(): Monster | null | undefined {
    if (this.monstieSlug === null) {
      return null;
    }

    return monstersBySlug.get(this.monstieSlug);
  }

  get genes(): (Gene | undefined)[] {
    return this.geneSlugs.map((slug) => (slug ? genesBySlug.get(slug) : undefined));
  }

  get sortedGenes(): Gene[] {
    return orderBy(
      this.genes.filter((gene) => gene != null),
      [
        (gene) => {
          if (gene.baseName) {
            return `${gene.baseName} ${getGeneSizeAsNumber(gene.size)}`;
          }
          return gene.name;
        },
      ],
      ['asc']
    );
  }

  get uniqueGenes(): Gene[] {
    // reverse to keep the largest size
    // reverse again to restore alphabetical order
    return uniqBy(this.sortedGenes.toReversed(), (gene) => gene.baseName ?? gene.name).toReversed();
  }

  get eggPowers(): (EggPower | null | undefined)[] {
    return this.eggPowerSlugs.map((slug) => {
      if (slug === null) {
        return null;
      }

      return eggPowersBySlug.get(slug);
    });
  }

  get region(): Region | null | undefined {
    if (this.regionSlug === null) {
      return null;
    }

    return regionsBySlug.get(this.regionSlug);
  }

  isEggPowerAwakened(eggPower: EggPower): boolean {
    let result = true;

    for (const requirement of eggPower.variants[1]?.requirements ?? []) {
      if ('type' in requirement) {
        if (this.genes.every((gene) => gene?.type !== requirement.type)) {
          result = false;
        }
      }

      if ('element' in requirement) {
        if (this.genes.every((gene) => gene?.element !== requirement.element)) {
          result = false;
        }
      }
    }

    return result;
  }

  hasRequirement(requirement: EggPowerRequirement): boolean {
    if ('type' in requirement) {
      return this.genes.some((gene) => gene?.type === requirement.type);
    }

    if ('element' in requirement) {
      return this.genes.some((gene) => gene?.element === requirement.element);
    }

    return false;
  }

  isEmpty(): boolean {
    return (
      this.forkedFrom == null &&
      this.name == null &&
      this.description == null &&
      this.monstieSlug == null &&
      (this.geneSlugs.length === 0 || this.geneSlugs.every((slug) => slug == null)) &&
      (this.eggPowerSlugs.length === 0 || this.eggPowerSlugs.every((slug) => slug == null)) &&
      this.dualElement == null &&
      this.regionSlug == null
    );
  }

  toStableJson({ ignoreIds = false } = {}): string {
    const stable = sortKeys(this.toData());

    if (ignoreIds) {
      delete stable.id;
      delete stable.forkedFrom;
    }

    return JSON.stringify(stable);
  }

  toData(): MonstieBuildData {
    return {
      id: this.id,
      forkedFrom: this.forkedFrom,
      name: this.name,
      description: this.description,
      monstieSlug: this.monstieSlug,
      geneSlugs: Array.from(this.geneSlugs),
      eggPowerSlugs: Array.from(this.eggPowerSlugs),
      dualElement: this.dualElement,
      regionSlug: this.regionSlug,
    };
  }

  async getContentHash({ ignoreIds = false } = {}): Promise<string> {
    const json = this.toStableJson({ ignoreIds });

    return await hash(json);
  }
}

export const MonstieBuildSchema = z.object({
  id: z.string(),
  forkedFrom: z.string().nullable(),
  name: z.string().nullable(),
  description: z.string().nullable(),
  monstieSlug: z.string().nullable(),
  geneSlugs: z.array(z.string().nullable()),
  eggPowerSlugs: z.array(z.string().nullable()),
  dualElement: ElementTypeSchema.nullable(),
  regionSlug: z.string().nullable(),
});
export type MonstieBuildData = z.infer<typeof MonstieBuildSchema>;

const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'; // no _-
const nanoid = customAlphabet(alphabet, 11);

function generateLocalId(): string {
  return '_' + nanoid();
}
