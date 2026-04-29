import type { Gene } from '~/services/3/types';
import type { MonstieBuild } from '~/services/3/monstieBuilds';
import { uniq } from 'es-toolkit/array';

function makeMonstieBuildStore(build_: MonstieBuild) {
  return defineStore(`s3/monstieBuild/${build_.id}`, () => {
    // -- state
    const build = ref(build_);

    // -- getters
    const genes = computed(() => build.value.genes);

    const row1Bingo = computed(() => getBingo(genes.value[0], genes.value[1], genes.value[2]));
    const row2Bingo = computed(() => getBingo(genes.value[3], genes.value[4], genes.value[5]));
    const row3Bingo = computed(() => getBingo(genes.value[6], genes.value[7], genes.value[8]));
    const col1Bingo = computed(() => getBingo(genes.value[0], genes.value[3], genes.value[6]));
    const col2Bingo = computed(() => getBingo(genes.value[1], genes.value[4], genes.value[7]));
    const col3Bingo = computed(() => getBingo(genes.value[2], genes.value[5], genes.value[8]));
    const diag1Bingo = computed(() => getBingo(genes.value[0], genes.value[4], genes.value[8]));
    const diag2Bingo = computed(() => getBingo(genes.value[2], genes.value[4], genes.value[6]));

    const allBingos = computed(() => [
      row1Bingo,
      row2Bingo,
      row3Bingo,
      col1Bingo,
      col2Bingo,
      col3Bingo,
      diag1Bingo,
      diag2Bingo,
    ]);

    const elementBingoCounts = computed(() => {
      const map = new Map<ElementType, number>();

      for (const bingo of allBingos.value) {
        if (bingo.value.bingo && bingo.value.element) {
          map.set(bingo.value.element, (map.get(bingo.value.element) ?? 0) + 1);
        }
      }

      return [...map.entries()]
        .map(([element, count]) => ({ count, element }))
        .sort((a, b) => b.count - a.count);
    });

    const typeBingoCounts = computed(() => {
      const map = new Map<AttackType, number>();

      for (const bingo of allBingos.value) {
        if (bingo.value.bingo && bingo.value.type) {
          map.set(bingo.value.type, (map.get(bingo.value.type) ?? 0) + 1);
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

    // -- actions
    function getBingo(...genes: (Gene | undefined)[]) {
      const result: { bingo: boolean; element?: ElementType; type?: AttackType } = {
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

    return {
      // -- state
      build,

      // -- getters
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
  });
}

export default function useMonstieBuildStore(build: MonstieBuild) {
  return makeMonstieBuildStore(build)();
}
