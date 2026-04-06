import { intersection } from 'es-toolkit/array';
import type {
  Gene,
  GeneElement,
  GeneSize,
  GeneType,
  SkillAilmentType,
  SkillBuffType,
  SkillDebuffType,
  SkillEffectType,
  SkillTarget,
} from './types';
import genes_ from '~/assets/3/genes.json';

const genes = genes_ as unknown as Gene[];

export { genes };
export const genesByName = keyBy(genes, 'name');
export const genesBySlug = keyBy(genes, 'slug');
export const allElements: GeneElement[] = [
  'none',
  'fire',
  'water',
  'thunder',
  'ice',
  'dragon',
  'all',
] as const;
export const allTypes: GeneType[] = [null, 'power', 'speed', 'technical', 'all'] as const;
export const allSizes: GeneSize[] = ['none', 'S', 'M', 'L', 'XL', '-', '+'] as const;
export const allTargets: SkillTarget[] = [
  'singleEnemy',
  'allEnemies',
  'randomEnemy',
  'allAllies',
  'user',
] as const;

export function getGenesByName(name: string, geneList: Gene[] = genes): Gene[] {
  const query = name.toLowerCase();

  return geneList.filter((gene) => gene.name.toLowerCase().includes(query));
}

export function getGeneSizeAsNumber(size: GeneSize): number {
  switch (size) {
    case 'none':
      return 0;

    case 'S':
      return 1;

    case 'M':
      return 2;

    case 'L':
      return 3;

    case 'XL':
      return 4;

    case '-':
      return 5;

    case '+':
      return 6;
  }
}

export function getGenesBySize(size: GeneSize | null, geneList: Gene[] = genes): Gene[] {
  if (size != null) {
    return geneList.filter((gene) => gene.size === size);
  }

  // return only largest size for genes of the same base name

  const geneListByName = keyBy(geneList, 'name');

  return geneList.filter((gene) => {
    // there are no other sizes -> return this one
    if (gene.size === 'none' || gene.sizes == null || gene.sizes.length === 0) {
      return true;
    }

    const size = getGeneSizeAsNumber(gene.size);

    // is there a related gene with a larger size?
    return !gene.sizes.some((relatedName) => {
      const relatedGene = geneListByName.get(relatedName);

      if (relatedGene == null) {
        return false;
      }

      const relatedSize = getGeneSizeAsNumber(relatedGene.size);

      return relatedSize > size;
    });
  });
}

export function getGenesByType(type: GeneType, geneList: Gene[] = genes): Gene[] {
  return geneList.filter((gene) => gene.type === type);
}

export function getGenesByElement(element: GeneElement, geneList: Gene[] = genes): Gene[] {
  return geneList.filter((gene) => gene.element === element);
}

export function getGenesByActive(mustBeActive: boolean, geneList: Gene[] = genes): Gene[] {
  return geneList.filter((gene) => (gene.active ?? false) === mustBeActive);
}

export function getGenesByTarget(target: SkillTarget, geneList: Gene[] = genes): Gene[] {
  return geneList.filter((gene) => gene.target === target);
}

export function getGenesByBreath(mustBeBreath: boolean, geneList: Gene[] = genes): Gene[] {
  return geneList.filter((gene) => (gene.breath ?? false) === mustBeBreath);
}

export function getGenesByEggSkill(mustBeEggSkill: boolean, geneList: Gene[] = genes): Gene[] {
  return geneList.filter((gene) => (gene.eggSkill ?? false) === mustBeEggSkill);
}

export function getGenesByAilment(
  ailment: SkillAilmentType | SkillAilmentType[],
  geneList: Gene[] = genes
): Gene[] {
  const ailments = Array.isArray(ailment) ? ailment : [ailment];

  return geneList.filter((gene) => intersection(gene.ailment ?? [], ailments).length > 0);
}

export function getGenesByBuff(
  buff: SkillBuffType | SkillBuffType[],
  geneList: Gene[] = genes
): Gene[] {
  const buffs = Array.isArray(buff) ? buff : [buff];

  return geneList.filter((gene) => intersection(gene.buff ?? [], buffs).length > 0);
}

export function getGenesByDebuff(
  debuff: SkillDebuffType | SkillDebuffType[],
  geneList: Gene[] = genes
): Gene[] {
  const debuffs = Array.isArray(debuff) ? debuff : [debuff];

  return geneList.filter((gene) => intersection(gene.debuff ?? [], debuffs).length > 0);
}

export function getGenesByEffect(
  effect: SkillEffectType | SkillEffectType[],
  geneList: Gene[] = genes
): Gene[] {
  const effects = Array.isArray(effect) ? effect : [effect];

  return geneList.filter((gene) => intersection(gene.effect ?? [], effects).length > 0);
}
