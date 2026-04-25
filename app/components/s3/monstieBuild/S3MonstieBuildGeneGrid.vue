<script lang="ts" setup>
  import type { Gene } from '~/services/3/types';
  import { uniq } from 'es-toolkit/array';
  import { genesBySlug } from '~/services/3/genes';

  const gene1 = genesBySlug.get('antiburn-s');
  const gene2 = genesBySlug.get('antiparalysis-s');
  const gene3 = genesBySlug.get('aqua-jet');
  const gene4 = genesBySlug.get('free-bingo-gene');

  const genes: (Gene | undefined)[] = [
    gene1,
    gene1,
    gene1,
    gene1,
    gene1,
    gene1,
    gene1,
    gene1,
    gene1,
    gene1,
    gene1,
    gene1,
  ];

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

  const row1Bingo = computed(() => getBingo(genes[0], genes[1], genes[2]));
  const row2Bingo = computed(() => getBingo(genes[3], genes[4], genes[5]));
  const row3Bingo = computed(() => getBingo(genes[6], genes[7], genes[8]));
  const col1Bingo = computed(() => getBingo(genes[0], genes[3], genes[6]));
  const col2Bingo = computed(() => getBingo(genes[1], genes[4], genes[7]));
  const col3Bingo = computed(() => getBingo(genes[2], genes[5], genes[8]));
  const diag1Bingo = computed(() => getBingo(genes[0], genes[4], genes[8]));
  const diag2Bingo = computed(() => getBingo(genes[2], genes[4], genes[6]));

  function lineColor(bingo: boolean) {
    return bingo ? 'bg-gene-bingo' : 'bg-gene-grid';
  }
</script>

<template>
  <div
    style="
      --cell: 120px;
      --half-cell: calc(var(--cell) / 2);
      --inset: calc(var(--cell) / 3.5);
      --half-inset: calc(var(--inset) / 2);
      --gap: calc(var(--cell) / 14);
      --size: calc(var(--cell) * 3 + var(--gap) * 2);
      --line: calc(var(--cell) / 13);
      --half-line: calc(var(--line) / 2);
      --circle: calc(var(--cell) / 3.75);
    "
    class="relative size-(--size) bg-neutral-900"
  >
    <div class="pointer-events-none absolute inset-(--inset) bg-neutral-800 select-none">
      <!-- rows -->
      <div class="absolute inset-0 grid grid-cols-3 grid-rows-3 items-center gap-(--gap)">
        <div class="col-span-3 mx-(--half-cell) h-(--line)" :class="lineColor(row1Bingo.bingo)" />
        <div class="col-span-3 mx-(--half-cell) h-(--line)" :class="lineColor(row2Bingo.bingo)" />
        <div class="col-span-3 mx-(--half-cell) h-(--line)" :class="lineColor(row3Bingo.bingo)" />
      </div>

      <!-- cols -->
      <div class="absolute inset-0 grid grid-cols-3 grid-rows-3 justify-items-center gap-(--gap)">
        <div class="row-span-3 my-(--half-cell) w-(--line)" :class="lineColor(col1Bingo.bingo)" />
        <div class="row-span-3 my-(--half-cell) w-(--line)" :class="lineColor(col2Bingo.bingo)" />
        <div class="row-span-3 my-(--half-cell) w-(--line)" :class="lineColor(col3Bingo.bingo)" />
      </div>

      <!-- diagonal top left to bottom right -->
      <div class="absolute inset-0 grid grid-cols-3 grid-rows-3 items-center gap-(--gap)">
        <div
          class="col-span-3 row-start-2 h-(--line) rotate-45"
          :class="lineColor(diag1Bingo.bingo)"
        />
      </div>

      <!-- diagonal top right to bottom left -->
      <div class="absolute inset-0 grid grid-cols-3 grid-rows-3 items-center gap-(--gap)">
        <div
          class="col-span-3 row-start-2 h-(--line) -rotate-45"
          :class="lineColor(diag2Bingo.bingo)"
        />
      </div>

      <!-- bingo rows -->
      <div class="absolute inset-0 grid grid-cols-3 grid-rows-3 items-center gap-(--gap)">
        <div
          v-if="row1Bingo.element"
          class="mr-(--half-cell) -ml-(--half-inset) h-(--line) bg-gene-bingo"
        />
        <div v-else />
        <div />
        <div
          v-if="row1Bingo.type"
          class="-mr-(--half-inset) ml-(--half-cell) h-(--line) bg-gene-bingo"
        />
        <div v-else />

        <div
          v-if="row2Bingo.element"
          class="mr-(--half-cell) -ml-(--half-inset) h-(--line) bg-gene-bingo"
        />
        <div v-else />
        <div />
        <div
          v-if="row2Bingo.type"
          class="-mr-(--half-inset) ml-(--half-cell) h-(--line) bg-gene-bingo"
        />
        <div v-else />

        <div
          v-if="row3Bingo.element"
          class="mr-(--half-cell) -ml-(--half-inset) h-(--line) bg-gene-bingo"
        />
        <div v-else />
        <div />
        <div
          v-if="row3Bingo.type"
          class="-mr-(--half-inset) ml-(--half-cell) h-(--line) bg-gene-bingo"
        />
        <div v-else />
      </div>

      <!-- bingo cols -->
      <div class="absolute inset-0 grid grid-cols-3 grid-rows-3 justify-items-center gap-(--gap)">
        <div
          v-if="col1Bingo.element"
          class="-mt-(--half-inset) mb-(--half-cell) w-(--line) bg-gene-bingo"
        />
        <div v-else />
        <div
          v-if="col2Bingo.element"
          class="-mt-(--half-inset) mb-(--half-cell) w-(--line) bg-gene-bingo"
        />
        <div v-else />
        <div
          v-if="col3Bingo.element"
          class="-mt-(--half-inset) mb-(--half-cell) w-(--line) bg-gene-bingo"
        />
        <div v-else />

        <div class="col-span-3" />

        <div
          v-if="col1Bingo.type"
          class="mt-(--half-cell) -mb-(--half-inset) w-(--line) bg-gene-bingo"
        />
        <div v-else />
        <div
          v-if="col2Bingo.type"
          class="mt-(--half-cell) -mb-(--half-inset) w-(--line) bg-gene-bingo"
        />
        <div v-else />
        <div
          v-if="col3Bingo.type"
          class="mt-(--half-cell) -mb-(--half-inset) w-(--line) bg-gene-bingo"
        />
        <div v-else />
      </div>

      <!-- bingo diagonals -->
      <div class="absolute inset-0 grid grid-cols-3 grid-rows-3 items-center gap-(--gap)">
        <div
          v-if="diag1Bingo.element"
          class="-mt-(--half-inset) mr-(--half-cell) mb-(--half-cell) -ml-(--half-inset) h-(--line) rotate-45 bg-gene-bingo"
        />
        <div />
        <div
          v-if="diag2Bingo.type"
          class="-mt-(--half-inset) -mr-(--half-inset) mb-(--half-cell) ml-(--half-cell) h-(--line) -rotate-45 bg-gene-bingo"
        />

        <div class="col-span-3" />

        <div
          v-if="diag1Bingo.element"
          class="mt-(--half-cell) mr-(--half-cell) -mb-(--half-inset) -ml-(--half-inset) h-(--line) -rotate-45 bg-gene-bingo"
        />
        <div />
        <div
          v-if="diag2Bingo.type"
          class="mt-(--half-cell) -mr-(--half-inset) -mb-(--half-inset) ml-(--half-cell) h-(--line) rotate-45 bg-gene-bingo"
        />
      </div>

      <!-- bingo circles rows -->
      <div class="absolute inset-0 grid grid-cols-3 grid-rows-3 items-center gap-(--gap)">
        <div
          v-if="row1Bingo.element"
          class="-ml-(--inset) size-(--circle) rounded-full bg-gene-bingo"
        >
          <ElementIcon :element="row1Bingo.element" />
        </div>
        <div v-else />
        <div />
        <div
          v-if="row1Bingo.type"
          class="z-10 -mr-(--inset) size-(--circle) justify-self-end rounded-full bg-gene-bingo"
        >
          <AttackTypeIcon :type="row1Bingo.type" />
        </div>
        <div v-else />

        <div
          v-if="row2Bingo.element"
          class="-ml-(--inset) size-(--circle) rounded-full bg-gene-bingo"
        >
          <ElementIcon :element="row2Bingo.element" />
        </div>
        <div v-else />
        <div />
        <div
          v-if="row2Bingo.type"
          class="z-10 -mr-(--inset) size-(--circle) justify-self-end rounded-full bg-gene-bingo"
        >
          <AttackTypeIcon :type="row2Bingo.type" />
        </div>
        <div v-else />

        <div
          v-if="row3Bingo.element"
          class="-ml-(--inset) size-(--circle) rounded-full bg-gene-bingo"
        >
          <ElementIcon :element="row3Bingo.element" />
        </div>
        <div v-else />
        <div />
        <div
          v-if="row3Bingo.type"
          class="z-10 -mr-(--inset) size-(--circle) justify-self-end rounded-full bg-gene-bingo"
        >
          <AttackTypeIcon :type="row3Bingo.type" />
        </div>
        <div v-else />
      </div>

      <!-- bingo circles cols -->
      <div class="absolute inset-0 grid grid-cols-3 grid-rows-3 justify-items-center gap-(--gap)">
        <div
          v-if="col1Bingo.element"
          class="-mt-(--inset) size-(--circle) rounded-full bg-gene-bingo"
        >
          <ElementIcon :element="col1Bingo.element" />
        </div>
        <div v-else />
        <div
          v-if="col2Bingo.element"
          class="-mt-(--inset) size-(--circle) rounded-full bg-gene-bingo"
        >
          <ElementIcon :element="col2Bingo.element" />
        </div>
        <div v-else />
        <div
          v-if="col3Bingo.element"
          class="-mt-(--inset) size-(--circle) rounded-full bg-gene-bingo"
        >
          <ElementIcon :element="col3Bingo.element" />
        </div>
        <div v-else />

        <div class="col-span-3" />

        <div
          v-if="col1Bingo.type"
          class="-mb-(--inset) size-(--circle) self-end rounded-full bg-gene-bingo"
        >
          <AttackTypeIcon :type="col1Bingo.type" />
        </div>
        <div v-else />
        <div
          v-if="col2Bingo.type"
          class="-mb-(--inset) size-(--circle) self-end rounded-full bg-gene-bingo"
        >
          <AttackTypeIcon :type="col2Bingo.type" />
        </div>
        <div v-else />
        <div
          v-if="col3Bingo.type"
          class="-mb-(--inset) size-(--circle) self-end rounded-full bg-gene-bingo"
        >
          <AttackTypeIcon :type="col3Bingo.type" />
        </div>
        <div v-else />
      </div>

      <!-- gene grid background -->
      <div class="absolute inset-0 grid grid-cols-3 grid-rows-3 gap-(--gap)">
        <img src="~/assets/3/gene/size-s.avif" alt="" aria-hidden="true" />
        <img src="~/assets/3/gene/size-s.avif" alt="" aria-hidden="true" />
        <img src="~/assets/3/gene/size-s.avif" alt="" aria-hidden="true" />
        <img src="~/assets/3/gene/size-s.avif" alt="" aria-hidden="true" />
        <img src="~/assets/3/gene/size-s.avif" alt="" aria-hidden="true" />
        <img src="~/assets/3/gene/size-s.avif" alt="" aria-hidden="true" />
        <img src="~/assets/3/gene/size-s.avif" alt="" aria-hidden="true" />
        <img src="~/assets/3/gene/size-s.avif" alt="" aria-hidden="true" />
        <img src="~/assets/3/gene/size-s.avif" alt="" aria-hidden="true" />
      </div>
    </div>

    <div
      class="absolute inset-(--inset) grid grid-cols-3 grid-rows-3 place-items-center gap-(--gap)"
    >
      <div>A</div>
      <div>B</div>
      <div>C</div>
      <div>D</div>
      <div>E</div>
      <div>F</div>
      <div>G</div>
      <div>H</div>
      <div>I</div>
    </div>
  </div>
</template>
