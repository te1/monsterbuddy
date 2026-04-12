import type { MonsterLocationType } from './data';
import type {
  AilmentType,
  GeneElement,
  GeneSize,
  GeneType,
  Monster,
  MonsterTag,
  RidingActionType,
  SkillAilmentType,
  SkillBuffTurns,
  SkillBuffType,
  SkillDebuffType,
  SkillEffectType,
  SkillTarget,
  StatsType,
} from './types';

export function formatMonsterInfoAll(monster: Monster) {
  return monster.tags?.map(formatMonsterTag).join(', ') ?? '';
}

export function formatMonsterInfoShort(monster: Monster) {
  if (monster.tags?.includes('calamitous')) {
    return formatMonsterTag('calamitous');
  }

  if (monster.tags?.includes('endangered')) {
    return formatMonsterTag('endangered');
  }

  if (monster.tags?.includes('mutation')) {
    return formatMonsterTag('mutation');
  }

  if (monster.tags?.includes('deviant')) {
    return formatMonsterTag('deviant');
  }

  if (monster.tags?.includes('subspecies')) {
    return formatMonsterTag('subspecies');
  }
}

export function formatMonsterTag(tag: MonsterTag) {
  switch (tag) {
    case 'subspecies':
      return 'Subspecies';

    case 'deviant':
      return 'Deviant';

    case 'calamitous':
      return 'Calamitous';

    case 'endangered':
      return 'Endangered';

    case 'mutation':
      return 'Mutation';
  }
}

export function formatRidingActionType(type: RidingActionType) {
  switch (type) {
    case 'utility':
      return 'Utility';

    case 'explore':
      return 'Exploration';

    case 'combat':
      return 'Combat';

    default:
      return '';
  }
}

export function formatState(state: string) {
  switch (state) {
    case 'DEFAULT':
      return 'Default';

    case '?':
    case '??':
      return 'Enraged'; // TODO this is placeholder

    default:
      return state;
  }
}

export function formatLocationType(locationType: MonsterLocationType) {
  switch (locationType) {
    case 'permanent':
      return 'Habitat';

    case 'world':
      return 'World';

    default:
      return '';
  }
}

export function intensityToIcon(intensity: number | null) {
  switch (intensity) {
    case 2:
      return 'ph:caret-double-up-bold';

    case 1:
      return 'ph:caret-up-bold';

    case 0:
      return 'ph:number-zero-bold';

    case -1:
      return 'ph:caret-down-bold';

    case -2:
      return 'ph:caret-double-down-bold';

    default:
      return null;
  }
}

export function intensityToTextColor(intensity: number | null) {
  switch (intensity) {
    case -2:
    case -1:
      return 'text-red-500';

    case 1:
    case 2:
      return 'text-blue-500';

    default:
      return 'text-default';
  }
}

export function elementalResistanceTooltip(element: ElementType, intensity: number | null) {
  let modifier = '';

  switch (intensity) {
    case -2:
      modifier = 'greatly increased (×1.5)';
      break;

    case -1:
      modifier = 'increased (×1.25)';
      break;

    case 0:
      modifier = 'normal (×1.0)';
      break;

    case 1:
      modifier = 'reduced (×0.9)';
      break;

    case 2:
      modifier = 'greatly reduced (×0.7)';
      break;

    default:
      modifier = '?';
  }

  return `Takes ${modifier} ${formatElement(element).toLowerCase()} damage`;
}

export function formatAilment(ailment: AilmentType) {
  switch (ailment) {
    case 'poison':
      return 'Poison';

    case 'burn':
      return 'Burn';

    case 'paralysis':
      return 'Paralysis';

    case 'sleep':
      return 'Sleep';

    case 'blastblight':
      return 'Blastblight';

    case 'bleeding':
      return 'Bleeding';

    case 'darkness':
      return 'Darkness';

    default:
      return 'Unknown';
  }
}

export function ailmentResistanceTooltip(ailment: AilmentType, intensity: number | null) {
  let chance = '';

  switch (intensity) {
    case -2:
      chance = 'Greatly increased chance (100%)';
      break;

    case -1:
      chance = 'Increased chance (70%)';
      break;

    case 0:
      chance = 'Normal chance (50%)';
      break;

    case 1:
      chance = 'Reduced chance (30%)';
      break;

    case 2:
      chance = 'Greatly reduced chance (0%)';
      break;

    default:
      chance = '?';
  }

  return `${chance} to apply ${formatAilment(ailment).toLowerCase()}`;
}

export function statsTypeToText(type: StatsType) {
  switch (type) {
    case 'hp':
      return 'HP';

    case 'attack':
      return 'Attack';

    case 'speed':
      return 'Speed';

    case 'defense':
      return 'Defense';

    case 'crit':
      return 'Crit';

    case 'recovery':
      return 'Recovery';

    case 'stamina':
      return 'Stamina';

    default:
      return '?';
  }
}

export function formatGeneElement(element?: GeneElement): string {
  switch (element) {
    case 'all':
      return 'Rainbow';

    default:
      return formatElement(element);
  }
}

export function formatGeneType(geneType?: GeneType): string {
  switch (geneType) {
    case null:
      return 'None';

    case 'all':
      return 'Rainbow';

    default:
      return formatAttackType(geneType);
  }
}

export function formatGeneSize(size: GeneSize): string {
  switch (size) {
    case 'none':
      return 'No size';

    case '-':
      return 'Any Rank';

    case '+':
      return 'S Rank';

    default:
      return size;
  }
}

export function formatSkillTarget(target: SkillTarget): string {
  switch (target) {
    case 'allAllies':
      return 'Party';

    case 'allEnemies':
      return 'All Enemies';

    case 'randomEnemy':
      return 'Random Enemies';

    case 'singleEnemy':
      return 'Single Enemy';

    case 'user':
      return 'Self';
  }
}

export function formatSkillAilment(ailment: SkillAilmentType): string {
  switch (ailment) {
    case 'noxiousPoison':
      return 'Noxious Poison';

    case 'severePoison':
      return 'Severe Poison';

    default:
      return formatAilment(ailment);
  }
}

export function formatSkillBuff(buff: SkillBuffType): string {
  switch (buff) {
    case 'Ailment Inflict Rate Up':
      return 'Inflict Rate Up';

    case 'Dragon Attack Up':
      return 'Dragon Atk Up';

    case 'Fire Attack Up':
      return 'Fire Atk Up';

    case 'Ice Attack Up':
      return 'Ice Atk Up';

    case 'Thunder Attack Up':
      return 'Thunder Atk Up';

    case 'Water Attack Up':
      return 'Water Atk Up';

    default:
      return buff;
  }
}

export function formatSkillDebuff(debuff: SkillDebuffType): string {
  switch (debuff) {
    case 'Dragon Defense Down':
      return 'Dragon Def Down';

    case 'Thunder Defense Down':
      return 'Thunder Def Down';

    case 'Wyvernsoul Defense Down':
      return 'Wyvernsoul Def Down';

    default:
      return debuff;
  }
}

export function formatSkillBuffTurns(turns: SkillBuffTurns): string {
  switch (turns) {
    case '1':
      return '1 turn';

    case '2':
      return '2 turns';

    case '3':
      return '3 turns';

    case 'thisTurn':
      return 'this turn';

    case 'nextTurn':
      return 'next turn';

    case 'next2Turn':
      return 'next 2 turns';
  }
}

export function formatSkillEffect(effect: SkillEffectType): string {
  switch (effect) {
    case '1HitKo':
      return '1-Hit-KO';

    case 'explodeBlastblight':
      return 'Explode Blastblight';

    case 'evade':
      return 'Evade';

    case 'stun':
      return 'Stun';

    case 'spam':
      return 'Repeated Use';

    case 'crit':
      return 'High Crit';

    case 'recoil':
      return 'Recoil Damage';

    case 'nextTurn':
      return 'On Next Turn';

    case 'leech':
      return 'Leech';

    case 'lowAccuracy':
      return 'Low Hit Chance';

    case 'chaser':
      return 'Chaser';

    case 'priority':
      return 'Priority';

    case 'procBlastblight':
      return 'Blastblight';

    case 'procBurn':
      return 'Burn';

    case 'procParalysis':
      return 'Paralysis';
  }
}

export function formatSkillEffectDetails(effect: SkillEffectType): string {
  switch (effect) {
    case 'stun':
      return 'Target is unable to act this turn';

    default:
      return '';
  }
}
