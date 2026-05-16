<script lang="ts" setup>
  import type { Gene } from '~/services/3/types';
  import type { GeneIndex, MonstieBuild } from '~/services/3/monstieBuilds';
  import type { GenePickedEvent } from './S3MonstieBuildGenePicker.vue';
  import { useMonstieBuildBingos } from '~/composables/3/useMonstieBuildBingos';

  export type GeneSwapEvent = { from: GeneIndex; to: GeneIndex };

  const geneIndexes: readonly GeneIndex[] = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  const DRAG_THRESHOLD = 6;
  const TOUCH_TARGET_OFFSET = 32;
  const DRAG_AVATAR_SCALE = 1;

  const props = withDefaults(
    defineProps<{
      build: MonstieBuild;
      editMode?: boolean;
    }>(),
    {
      editMode: false,
    }
  );

  const emit = defineEmits<{
    'update:gene': [data: GenePickedEvent];
    'swap:genes': [data: GeneSwapEvent];
  }>();

  const {
    genes,
    row1Bingo,
    row2Bingo,
    row3Bingo,
    col1Bingo,
    col2Bingo,
    col3Bingo,
    diag1Bingo,
    diag2Bingo,
  } = useMonstieBuildBingos(() => props.build);

  function lineColor(bingo: boolean) {
    return bingo ? 'bg-gene-bingo' : 'bg-gene-grid';
  }

  const slotEls = ref<(HTMLElement | null)[]>([]);
  const slotCenters = ref<{ index: GeneIndex; x: number; y: number }[]>([]);
  const draggedIndex = ref<GeneIndex | null>(null);
  const targetIndex = ref<GeneIndex | null>(null);
  const isDragging = ref(false);
  const activePointerId = ref<number | null>(null);
  const dragPointerType = ref<PointerEvent['pointerType']>('mouse');
  const dragStart = ref({ x: 0, y: 0 });
  const dragPointer = ref({ x: 0, y: 0 });
  const dragCellSize = ref(0);
  const suppressNextClick = ref(false);
  let suppressNextClickTimer: number | null = null;

  const draggedGene = computed(() => {
    if (draggedIndex.value == null) {
      return;
    }

    return genes.value[draggedIndex.value];
  });

  const displayGenes = computed<(Gene | null)[]>(() => {
    const result = geneIndexes.map((index) => genes.value[index] ?? null);

    if (isDragging.value && draggedIndex.value != null && targetIndex.value != null) {
      const draggedGene = result[draggedIndex.value] ?? null;
      const targetGene = result[targetIndex.value] ?? null;

      result[draggedIndex.value] = targetGene;
      result[targetIndex.value] = draggedGene;
    }

    return result;
  });

  const dragAvatarStyle = computed(() => {
    const size = dragCellSize.value;
    const scaledSize = size * DRAG_AVATAR_SCALE;
    const offsetY = dragPointerType.value === 'touch' ? TOUCH_TARGET_OFFSET : 0;
    const x = dragPointer.value.x - scaledSize / 2;
    const y = dragPointer.value.y + offsetY - scaledSize / 2;

    return {
      width: `${size}px`,
      height: `${size}px`,
      transform: `translate3d(${x}px, ${y}px, 0) scale(${DRAG_AVATAR_SCALE})`,
      transformOrigin: 'top left',
    };
  });

  function setSlotEl(index: GeneIndex, el: Element | null) {
    slotEls.value[index] = el instanceof HTMLElement ? el : null;
  }

  function cacheSlotCenters() {
    slotCenters.value = geneIndexes.flatMap((index) => {
      const el = slotEls.value[index];

      if (!el) {
        return [];
      }

      const rect = el.getBoundingClientRect();

      if (index === draggedIndex.value) {
        dragCellSize.value = rect.width;
      }

      return [
        {
          index,
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        },
      ];
    });
  }

  function getClosestSlot(event: PointerEvent): GeneIndex | null {
    if (slotCenters.value.length === 0) {
      return null;
    }

    const offsetY = event.pointerType === 'touch' ? TOUCH_TARGET_OFFSET : 0;
    const x = event.clientX;
    const y = event.clientY + offsetY;

    return slotCenters.value.reduce((closest, center) => {
      const closestDistance = Math.hypot(x - closest.x, y - closest.y);
      const currentDistance = Math.hypot(x - center.x, y - center.y);

      return currentDistance < closestDistance ? center : closest;
    }).index;
  }

  function startDragging(event: PointerEvent) {
    if (isDragging.value) {
      return;
    }

    isDragging.value = true;
    suppressNextClick.value = true;
    event.preventDefault();
  }

  function clearSuppressNextClickSoon() {
    if (suppressNextClickTimer != null) {
      window.clearTimeout(suppressNextClickTimer);
    }

    suppressNextClickTimer = window.setTimeout(() => {
      suppressNextClick.value = false;
      suppressNextClickTimer = null;
    }, 0);
  }

  function addDragListeners() {
    window.addEventListener('pointermove', onPointerMove, { passive: false });
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('pointercancel', onPointerCancel);
  }

  function removeDragListeners() {
    window.removeEventListener('pointermove', onPointerMove);
    window.removeEventListener('pointerup', onPointerUp);
    window.removeEventListener('pointercancel', onPointerCancel);
  }

  function onSlotPointerDown(event: PointerEvent, index: GeneIndex) {
    if (!props.editMode || event.button !== 0 || !genes.value[index]) {
      return;
    }

    activePointerId.value = event.pointerId;
    draggedIndex.value = index;
    targetIndex.value = index;
    dragPointerType.value = event.pointerType;
    dragStart.value = { x: event.clientX, y: event.clientY };
    dragPointer.value = { x: event.clientX, y: event.clientY };
    cacheSlotCenters();
    addDragListeners();
  }

  function onPointerMove(event: PointerEvent) {
    if (activePointerId.value !== event.pointerId || draggedIndex.value == null) {
      return;
    }

    dragPointer.value = { x: event.clientX, y: event.clientY };

    if (!isDragging.value) {
      const distance = Math.hypot(
        event.clientX - dragStart.value.x,
        event.clientY - dragStart.value.y
      );

      if (distance < DRAG_THRESHOLD) {
        return;
      }

      startDragging(event);
    }

    event.preventDefault();
    targetIndex.value = getClosestSlot(event) ?? draggedIndex.value;
  }

  function resetDragState() {
    activePointerId.value = null;
    draggedIndex.value = null;
    targetIndex.value = null;
    isDragging.value = false;
    slotCenters.value = [];
    dragCellSize.value = 0;
    removeDragListeners();
  }

  function onPointerUp(event: PointerEvent) {
    if (activePointerId.value !== event.pointerId) {
      return;
    }

    const from = draggedIndex.value;
    const to = targetIndex.value;
    const shouldSwap = isDragging.value && from != null && to != null && from !== to;

    const wasDragging = isDragging.value;

    if (wasDragging) {
      event.preventDefault();
    }

    resetDragState();

    if (wasDragging) {
      clearSuppressNextClickSoon();
    }

    if (shouldSwap) {
      emit('swap:genes', { from, to });
    }
  }

  function onPointerCancel(event: PointerEvent) {
    if (activePointerId.value !== event.pointerId) {
      return;
    }

    resetDragState();
    suppressNextClick.value = false;
  }

  function onSlotClickCapture(event: MouseEvent) {
    if (!suppressNextClick.value) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    suppressNextClick.value = false;

    if (suppressNextClickTimer != null) {
      window.clearTimeout(suppressNextClickTimer);
      suppressNextClickTimer = null;
    }
  }

  onBeforeUnmount(() => {
    removeDragListeners();

    if (suppressNextClickTimer != null) {
      window.clearTimeout(suppressNextClickTimer);
    }
  });
</script>

<template>
  <div
    style="
      --half-cell: calc(var(--cell) / 2);
      --inset: calc(var(--cell) / 3.25);
      --half-inset: calc(var(--inset) / 2);
      --diag-inset: calc(var(--inset) / 1.5);
      --gap: calc(var(--cell) / 12);
      --size: calc(var(--cell) * 3 + var(--gap) * 2);
      --line: calc(var(--cell) / 13);
      --half-line: calc(var(--line) / 2);
      --circle: calc(var(--cell) / 3.75);
    "
    class="relative size-(--size) [--cell:100px] @sm:[--cell:120px]"
  >
    <!-- grid background -->
    <div
      class="pointer-events-none absolute inset-(--inset) drop-shadow-sm drop-shadow-black select-none"
    >
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
        <div v-else />
        <div />
        <div
          v-if="diag2Bingo.type"
          class="-mt-(--half-inset) -mr-(--half-inset) mb-(--half-cell) ml-(--half-cell) h-(--line) -rotate-45 bg-gene-bingo"
        />
        <div v-else />

        <div class="col-span-3" />

        <div
          v-if="diag2Bingo.element"
          class="mt-(--half-cell) mr-(--half-cell) -mb-(--half-inset) -ml-(--half-inset) h-(--line) -rotate-45 bg-gene-bingo"
        />
        <div v-else />
        <div />
        <div
          v-if="diag1Bingo.type"
          class="mt-(--half-cell) -mr-(--half-inset) -mb-(--half-inset) ml-(--half-cell) h-(--line) rotate-45 bg-gene-bingo"
        />
        <div v-else />
      </div>

      <!-- bingo circles rows -->
      <div class="absolute inset-0 grid grid-cols-3 grid-rows-3 items-center gap-(--gap)">
        <div
          v-if="row1Bingo.element"
          class="-ml-(--inset) size-(--circle) rounded-full bg-gene-bingo"
        >
          <ElementIcon :element="row1Bingo.element" icon2 />
        </div>
        <div v-else />
        <div />
        <div
          v-if="row1Bingo.type"
          class="-mr-(--inset) size-(--circle) justify-self-end rounded-full bg-gene-bingo"
        >
          <AttackTypeIcon :type="row1Bingo.type" icon2 />
        </div>
        <div v-else />

        <div
          v-if="row2Bingo.element"
          class="-ml-(--inset) size-(--circle) rounded-full bg-gene-bingo"
        >
          <ElementIcon :element="row2Bingo.element" icon2 />
        </div>
        <div v-else />
        <div />
        <div
          v-if="row2Bingo.type"
          class="-mr-(--inset) size-(--circle) justify-self-end rounded-full bg-gene-bingo"
        >
          <AttackTypeIcon :type="row2Bingo.type" icon2 />
        </div>
        <div v-else />

        <div
          v-if="row3Bingo.element"
          class="-ml-(--inset) size-(--circle) rounded-full bg-gene-bingo"
        >
          <ElementIcon :element="row3Bingo.element" icon2 />
        </div>
        <div v-else />
        <div />
        <div
          v-if="row3Bingo.type"
          class="-mr-(--inset) size-(--circle) justify-self-end rounded-full bg-gene-bingo"
        >
          <AttackTypeIcon :type="row3Bingo.type" icon2 />
        </div>
        <div v-else />
      </div>

      <!-- bingo circles cols -->
      <div class="absolute inset-0 grid grid-cols-3 grid-rows-3 justify-items-center gap-(--gap)">
        <div
          v-if="col1Bingo.element"
          class="-mt-(--inset) size-(--circle) rounded-full bg-gene-bingo"
        >
          <ElementIcon :element="col1Bingo.element" icon2 />
        </div>
        <div v-else />
        <div
          v-if="col2Bingo.element"
          class="-mt-(--inset) size-(--circle) rounded-full bg-gene-bingo"
        >
          <ElementIcon :element="col2Bingo.element" icon2 />
        </div>
        <div v-else />
        <div
          v-if="col3Bingo.element"
          class="-mt-(--inset) size-(--circle) rounded-full bg-gene-bingo"
        >
          <ElementIcon :element="col3Bingo.element" icon2 />
        </div>
        <div v-else />

        <div class="col-span-3" />

        <div
          v-if="col1Bingo.type"
          class="-mb-(--inset) size-(--circle) self-end rounded-full bg-gene-bingo"
        >
          <AttackTypeIcon :type="col1Bingo.type" icon2 />
        </div>
        <div v-else />
        <div
          v-if="col2Bingo.type"
          class="-mb-(--inset) size-(--circle) self-end rounded-full bg-gene-bingo"
        >
          <AttackTypeIcon :type="col2Bingo.type" icon2 />
        </div>
        <div v-else />
        <div
          v-if="col3Bingo.type"
          class="-mb-(--inset) size-(--circle) self-end rounded-full bg-gene-bingo"
        >
          <AttackTypeIcon :type="col3Bingo.type" icon2 />
        </div>
        <div v-else />
      </div>

      <!-- bingo circles diagonals -->
      <div class="absolute inset-0 grid grid-cols-3 grid-rows-3 items-center gap-(--gap)">
        <div
          v-if="diag1Bingo.element"
          class="-mt-(--diag-inset) -ml-(--diag-inset) size-(--circle) self-start rounded-full bg-gene-bingo"
        >
          <ElementIcon :element="diag1Bingo.element" icon2 />
        </div>
        <div v-else />
        <div />
        <div
          v-if="diag2Bingo.type"
          class="-mt-(--diag-inset) -mr-(--diag-inset) size-(--circle) self-start justify-self-end rounded-full bg-gene-bingo"
        >
          <AttackTypeIcon :type="diag2Bingo.type" icon2 />
        </div>
        <div v-else />

        <div class="col-span-3" />

        <div
          v-if="diag2Bingo.element"
          class="-mb-(--diag-inset) -ml-(--diag-inset) size-(--circle) self-end rounded-full bg-gene-bingo"
        >
          <ElementIcon :element="diag2Bingo.element" icon2 />
        </div>
        <div v-else />
        <div />
        <div
          v-if="diag1Bingo.type"
          class="-mr-(--diag-inset) -mb-(--diag-inset) size-(--circle) self-end justify-self-end rounded-full bg-gene-bingo"
        >
          <AttackTypeIcon :type="diag1Bingo.type" icon2 />
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

    <!-- genes -->
    <div
      class="absolute inset-(--inset) grid grid-cols-3 grid-rows-3 place-items-center gap-(--gap)"
      :class="{ 'select-none': isDragging }"
    >
      <div
        v-for="index in geneIndexes"
        :key="index"
        :ref="(el: Element | null) => setSlotEl(index, el)"
        class="size-full"
        :class="{ 'touch-none': editMode && genes[index] }"
        @pointerdown="onSlotPointerDown($event, index)"
        @click.capture="onSlotClickCapture"
        @dragstart.prevent
      >
        <S3MonstieBuildGeneGridItem
          :build="build"
          :genes="genes"
          :gene="displayGenes[index]"
          :index="index"
          :editMode="editMode"
          :isDragging="isDragging"
          :isSource="isDragging && draggedIndex === index"
          :isTarget="isDragging && targetIndex === index"
          @update:gene="emit('update:gene', $event)"
        />
      </div>
    </div>

    <div
      v-if="isDragging && draggedGene"
      class="pointer-events-none fixed top-0 left-0 z-10 opacity-90"
      :style="dragAvatarStyle"
      aria-hidden="true"
    >
      <S3GeneIcon :gene="draggedGene" size="size-full" noTooltip />
    </div>
  </div>
</template>
