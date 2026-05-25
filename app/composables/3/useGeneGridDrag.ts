import type { Gene } from '~/services/3/types';
import type { GeneIndex } from '~/services/3/monstieBuilds';

export type GeneSwapEvent = { from: GeneIndex; to: GeneIndex };

const geneIndexes: readonly GeneIndex[] = [0, 1, 2, 3, 4, 5, 6, 7, 8];

const dragThreshold = 6;
const touchTargetOffset = 32;

export function useGeneGridDrag({
  editMode,
  genes,
  onSwap,
}: {
  editMode: MaybeRefOrGetter<boolean>;
  genes: MaybeRefOrGetter<(Gene | undefined)[]>;
  onSwap: (data: GeneSwapEvent) => void;
}) {
  const slotEls = ref<(HTMLElement | null)[]>([]);
  const slotCenters = ref<{ index: GeneIndex; x: number; y: number }[]>([]);
  const draggedIndex = ref<GeneIndex | null>(null);
  const targetIndex = ref<GeneIndex | null>(null);
  const isDragging = ref(false);
  const activePointerId = ref<number | null>(null);
  const dragPointerType = ref<PointerEvent['pointerType']>('mouse');
  const dragStart = ref({ x: 0, y: 0 });
  const dragPointer = ref({ x: 0, y: 0 });
  const dragOffset = ref({ x: 0, y: 0 });
  const dragCellSize = ref(0);

  const suppressNextClick = ref(false);
  let suppressNextClickTimer: number | null = null;

  const currentGenes = computed(() => toValue(genes));

  const draggedGene = computed(() => {
    if (draggedIndex.value == null) {
      return;
    }

    return currentGenes.value[draggedIndex.value];
  });

  const displayGenes = computed<(Gene | null)[]>(() => {
    const result = geneIndexes.map((index) => currentGenes.value[index] ?? null);

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
    const offsetY = dragPointerType.value === 'touch' ? touchTargetOffset : 0;
    const x = dragPointer.value.x - dragOffset.value.x - size / 2;
    const y = dragPointer.value.y + offsetY - dragOffset.value.y - size / 2;

    return {
      width: `${size}px`,
      height: `${size}px`,
      transform: `translate3d(${x}px, ${y}px, 0)`,
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

    const offsetY = event.pointerType === 'touch' ? touchTargetOffset : 0;
    const x = event.clientX - dragOffset.value.x;
    const y = event.clientY + offsetY - dragOffset.value.y;

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

  function clearSuppressNextClick() {
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
    if (!toValue(editMode) || event.button !== 0 || !currentGenes.value[index]) {
      return;
    }

    activePointerId.value = event.pointerId;
    draggedIndex.value = index;
    targetIndex.value = index;
    dragPointerType.value = event.pointerType;
    dragStart.value = { x: event.clientX, y: event.clientY };
    dragPointer.value = { x: event.clientX, y: event.clientY };
    cacheSlotCenters();

    const center = slotCenters.value.find((center) => center.index === index);
    dragOffset.value = center
      ? { x: event.clientX - center.x, y: event.clientY - center.y }
      : { x: 0, y: 0 };

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

      if (distance < dragThreshold) {
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
    dragOffset.value = { x: 0, y: 0 };
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
      clearSuppressNextClick();
    }

    if (shouldSwap) {
      onSwap({ from, to });
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

  return {
    geneIndexes,
    displayGenes,
    draggedGene,
    draggedIndex,
    targetIndex,
    isDragging,
    dragAvatarStyle,
    setSlotEl,
    onSlotPointerDown,
    onSlotClickCapture,
  };
}
