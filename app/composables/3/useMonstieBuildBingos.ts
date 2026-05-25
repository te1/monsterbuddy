import type { Gene } from '~/services/3/types';
import type { MonstieBuild } from '~/services/3/monstieBuilds';
import { uniq } from 'es-toolkit/array';

type Bingo = {
  bingo: boolean;
  element?: ElementType;
  type?: AttackType;
};

export function useMonstieBuildBingos(build: MaybeRefOrGetter<MonstieBuild>) {
  const genes = computed(() => toValue(build).genes);

  const row1Bingo = computed(() => getBingo(genes.value[0], genes.value[1], genes.value[2]));
  const row2Bingo = computed(() => getBingo(genes.value[3], genes.value[4], genes.value[5]));
  const row3Bingo = computed(() => getBingo(genes.value[6], genes.value[7], genes.value[8]));
  const col1Bingo = computed(() => getBingo(genes.value[0], genes.value[3], genes.value[6]));
  const col2Bingo = computed(() => getBingo(genes.value[1], genes.value[4], genes.value[7]));
  const col3Bingo = computed(() => getBingo(genes.value[2], genes.value[5], genes.value[8]));
  const diag1Bingo = computed(() => getBingo(genes.value[0], genes.value[4], genes.value[8]));
  const diag2Bingo = computed(() => getBingo(genes.value[2], genes.value[4], genes.value[6]));

  const allBingos = computed(() => [
    row1Bingo.value,
    row2Bingo.value,
    row3Bingo.value,
    col1Bingo.value,
    col2Bingo.value,
    col3Bingo.value,
    diag1Bingo.value,
    diag2Bingo.value,
  ]);

  const elementBingoCounts = computed(() => {
    const map = new Map<ElementType, number>();

    for (const bingo of allBingos.value) {
      if (bingo.bingo && bingo.element) {
        map.set(bingo.element, (map.get(bingo.element) ?? 0) + 1);
      }
    }

    return [...map.entries()]
      .map(([element, count]) => ({ count, element }))
      .sort((a, b) => b.count - a.count);
  });

  const typeBingoCounts = computed(() => {
    const map = new Map<AttackType, number>();

    for (const bingo of allBingos.value) {
      if (bingo.bingo && bingo.type) {
        map.set(bingo.type, (map.get(bingo.type) ?? 0) + 1);
      }
    }

    return [...map.entries()]
      .map(([type, count]) => ({ count, type }))
      .sort((a, b) => b.count - a.count);
  });

  const totalBingoCount = computed(() => {
    return (
      elementBingoCounts.value.reduce((total, { count }) => total + count, 0) +
      typeBingoCounts.value.reduce((total, { count }) => total + count, 0)
    );
  });

  return {
    genes,
    row1Bingo,
    row2Bingo,
    row3Bingo,
    col1Bingo,
    col2Bingo,
    col3Bingo,
    diag1Bingo,
    diag2Bingo,
    allBingos,
    elementBingoCounts,
    typeBingoCounts,
    totalBingoCount,
  };
}

function getBingo(...genes: (Gene | undefined)[]): Bingo {
  const result: Bingo = {
    bingo: false,
    element: undefined,
    type: undefined,
  };

  const elements = genes.map((gene) => gene?.element).filter((element) => element != null);
  if (elements.length === 3) {
    const uniqueElements = uniq(elements.filter((element) => element !== 'all'));
    if (uniqueElements.length === 1) {
      result.element = uniqueElements[0];
      result.bingo = true;
    }
  }

  const types = genes.map((gene) => gene?.type).filter((type) => type != null);
  if (types.length === 3) {
    const uniqueTypes = uniq(types.filter((type) => type !== 'all'));
    if (uniqueTypes.length === 1) {
      result.type = uniqueTypes[0];
      result.bingo = true;
    }
  }

  return result;
}
