<script lang="ts" setup>
  const row1ElementBingo = true;
  const row1TypeBingo = true;
  const row2ElementBingo = true;
  const row2TypeBingo = true;
  const row3ElementBingo = true;
  const row3TypeBingo = true;

  const col1ElementBingo = true;
  const col1TypeBingo = true;
  const col2ElementBingo = true;
  const col2TypeBingo = true;
  const col3ElementBingo = true;
  const col3TypeBingo = true;

  const diag1ElementBingo = true;
  const diag1TypeBingo = true;
  const diag2ElementBingo = true;
  const diag2TypeBingo = true;

  function lineColor(bingo: boolean) {
    return bingo ? 'bg-gene-bingo' : 'bg-gene-grid';
  }
</script>

<template>
  <div
    style="
      --inset: 25px;
      --half-inset: calc(var(--inset) / 2);
      --gap: 10px;
      --cell: 120px;
      --half-cell: calc(var(--cell) / 2);
      --size: calc(var(--cell) * 3 + var(--gap) * 2);
      --line: 10px;
      --half-line: calc(var(--line) / 2);
    "
    class="relative size-(--size) bg-neutral-900"
  >
    <div class="pointer-events-none absolute inset-(--inset) bg-neutral-800 select-none">
      <!-- rows -->
      <div class="absolute inset-0 grid grid-cols-3 grid-rows-3 items-center gap-(--gap)">
        <div
          class="col-span-3 mx-(--half-cell) h-(--line)"
          :class="lineColor(row1ElementBingo || row1TypeBingo)"
        />
        <div
          class="col-span-3 mx-(--half-cell) h-(--line)"
          :class="lineColor(row2ElementBingo || row2TypeBingo)"
        />
        <div
          class="col-span-3 mx-(--half-cell) h-(--line)"
          :class="lineColor(row3ElementBingo || row3TypeBingo)"
        />
      </div>

      <!-- cols -->
      <div class="absolute inset-0 grid grid-cols-3 grid-rows-3 justify-items-center gap-(--gap)">
        <div
          class="row-span-3 my-(--half-cell) w-(--line)"
          :class="lineColor(col1ElementBingo || col1TypeBingo)"
        />
        <div
          class="row-span-3 my-(--half-cell) w-(--line)"
          :class="lineColor(col2ElementBingo || col2TypeBingo)"
        />
        <div
          class="row-span-3 my-(--half-cell) w-(--line)"
          :class="lineColor(col3ElementBingo || col3TypeBingo)"
        />
      </div>

      <!-- diagonal top left to bottom right -->
      <div class="absolute inset-0 grid grid-cols-3 grid-rows-3 items-center gap-(--gap)">
        <div
          class="col-span-3 row-start-2 h-(--line) rotate-45"
          :class="lineColor(diag1ElementBingo || diag1TypeBingo)"
        />
      </div>

      <!-- diagonal top right to bottom left -->
      <div class="absolute inset-0 grid grid-cols-3 grid-rows-3 items-center gap-(--gap)">
        <div
          class="col-span-3 row-start-2 h-(--line) -rotate-45"
          :class="lineColor(diag2ElementBingo || diag2TypeBingo)"
        />
      </div>

      <!-- bingo rows -->
      <div class="absolute inset-0 grid grid-cols-3 grid-rows-3 items-center gap-(--gap)">
        <div
          v-if="row1ElementBingo"
          class="mr-(--half-cell) -ml-(--half-inset) h-(--line) bg-gene-bingo"
        />
        <div />
        <div
          v-if="row1TypeBingo"
          class="-mr-(--half-inset) ml-(--half-cell) h-(--line) bg-gene-bingo"
        />

        <div
          v-if="row2ElementBingo"
          class="mr-(--half-cell) -ml-(--half-inset) h-(--line) bg-gene-bingo"
        />
        <div />
        <div
          v-if="row2TypeBingo"
          class="-mr-(--half-inset) ml-(--half-cell) h-(--line) bg-gene-bingo"
        />

        <div
          v-if="row3ElementBingo"
          class="mr-(--half-cell) -ml-(--half-inset) h-(--line) bg-gene-bingo"
        />
        <div />
        <div
          v-if="row3TypeBingo"
          class="-mr-(--half-inset) ml-(--half-cell) h-(--line) bg-gene-bingo"
        />
      </div>

      <!-- bingo cols -->
      <div class="absolute inset-0 grid grid-cols-3 grid-rows-3 justify-items-center gap-(--gap)">
        <div
          v-if="col1ElementBingo"
          class="-mt-(--half-inset) mb-(--half-cell) w-(--line) bg-gene-bingo"
        />
        <div
          v-if="col2ElementBingo"
          class="-mt-(--half-inset) mb-(--half-cell) w-(--line) bg-gene-bingo"
        />
        <div
          v-if="col3ElementBingo"
          class="-mt-(--half-inset) mb-(--half-cell) w-(--line) bg-gene-bingo"
        />

        <div class="col-span-3" />

        <div
          v-if="col1TypeBingo"
          class="mt-(--half-cell) -mb-(--half-inset) w-(--line) bg-gene-bingo"
        />
        <div
          v-if="col2TypeBingo"
          class="mt-(--half-cell) -mb-(--half-inset) w-(--line) bg-gene-bingo"
        />
        <div
          v-if="col3TypeBingo"
          class="mt-(--half-cell) -mb-(--half-inset) w-(--line) bg-gene-bingo"
        />
      </div>

      <!-- bingo diagonals -->
      <div class="absolute inset-0 grid grid-cols-3 grid-rows-3 items-center gap-(--gap)">
        <div
          v-if="diag1ElementBingo"
          class="-mt-(--half-inset) mr-(--half-cell) mb-(--half-cell) -ml-(--half-inset) h-(--line) rotate-45 bg-gene-bingo"
        />
        <div />
        <div
          v-if="diag2TypeBingo"
          class="-mt-(--half-inset) -mr-(--half-inset) mb-(--half-cell) ml-(--half-cell) h-(--line) -rotate-45 bg-gene-bingo"
        />

        <div class="col-span-3" />

        <div
          v-if="diag1ElementBingo"
          class="mt-(--half-cell) mr-(--half-cell) -mb-(--half-inset) -ml-(--half-inset) h-(--line) -rotate-45 bg-gene-bingo"
        />
        <div />
        <div
          v-if="diag2TypeBingo"
          class="mt-(--half-cell) -mr-(--half-inset) -mb-(--half-inset) ml-(--half-cell) h-(--line) rotate-45 bg-gene-bingo"
        />
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
