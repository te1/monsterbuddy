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
export const allAilments: SkillAilmentType[] = [
  'poison',
  'noxiousPoison',
  'severePoison',
  'burn',
  'paralysis',
  'sleep',
  'blastblight',
  'bleeding',
  'darkness',
  'stun',
] as const;
export const allBuffs: SkillBuffType[] = [
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
] as const;
export const allDebuffs: SkillDebuffType[] = [
  'accuracyDown',
  'attackDown',
  'defenseDown',
  'dragonDefenseDown',
  'evasionDown',
  'speedDown',
  'thunderDefenseDown',
  'wyvernsoulDefenseDown',
] as const;
export const allEffects: SkillEffectType[] = ['1HitKo'] as const;

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

export function getGenesByAilment(ailment: SkillAilmentType, geneList: Gene[] = genes): Gene[] {
  return geneList.filter((gene) => gene.ailment?.includes(ailment) ?? false);
}

export function getGenesByBuff(buff: SkillBuffType, geneList: Gene[] = genes): Gene[] {
  return geneList.filter((gene) => gene.buff?.includes(buff) ?? false);
}

export function getGenesByDebuff(debuff: SkillDebuffType, geneList: Gene[] = genes): Gene[] {
  return geneList.filter((gene) => gene.debuff?.includes(debuff) ?? false);
}

export function getGenesByEffect(effect: SkillEffectType, geneList: Gene[] = genes): Gene[] {
  return geneList.filter((gene) => gene.effect?.includes(effect) ?? false);
}
