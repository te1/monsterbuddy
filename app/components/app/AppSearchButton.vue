<script setup lang="ts">
  import type { CatavanStand, Monster, RidingAction } from '~/services/2/types';
  import { createReusableTemplate } from '@vueuse/core';
  import {
    catavanStands,
    coopQuests,
    isDeviant,
    isSubspecies,
    monsters,
    sortedRidingActions,
  } from '~/services/2/data';
  import { formatCoopQuest, formatRidingActionType } from '~/services/2/presentation';

  const appConfig = useAppConfig();

  const [DefineButtonTemplate, ReuseButtonTemplate] = createReusableTemplate();

  const open = ref(false);

  // TODO make this search dependend on current game type

  const monsterItems = monsters.map((monster) => ({
    label: monster.name,
    suffix: getMonsterSuffix(monster),
    to: `/2/monsters/${monster.slug}`,
    data: monster,
  }));

  function getMonsterSuffix(monster: Monster) {
    const result: string[] = [];

    if (isSubspecies(monster)) {
      result.push('Subspecies');
    }

    if (isDeviant(monster)) {
      result.push('Deviant');
    }

    if (monster.hatchable) {
      result.push('Hatchable');
      result.push('Monstie');
    }

    result.push('Monster');

    return result.join(' ');
  }

  const catavanStandItems = catavanStands.map((catavanStand) => ({
    label: catavanStand.name,
    suffix: getCatavanStandSuffix(catavanStand),
    icon: 'ph:map-pin-fill',
    to: `/2/catavan-stands/${catavanStand.slug}`,
  }));

  function getCatavanStandSuffix(catavanStand: CatavanStand) {
    const result: string[] = [];

    if (catavanStand.zone) {
      result.push(catavanStand.zone);
    }

    result.push('Catavan Stand');

    return result.join(' ');
  }

  const coopQuestItems = coopQuests.map((coopQuest) => ({
    label: formatCoopQuest(coopQuest),
    suffix: 'Co-Op CoOp Quest',
    icon: 'ph:question-mark-bold',
    to: `/2/coop/${coopQuest.slug}`,
  }));

  const ridingActionItems = sortedRidingActions.map((ridingAction) => ({
    label: ridingAction.name,
    suffix: getRidingActionSuffix(ridingAction),
    icon: 'ph:exclamation-mark-bold',
    to: `/2/riding-actions/${ridingAction.slug}`,
  }));

  function getRidingActionSuffix(ridingAction: RidingAction) {
    const result: string[] = [];

    const type = formatRidingActionType(ridingAction.type);

    if (type) {
      result.push(type);
    }

    result.push('Riding Action');

    return result.join(' ');
  }

  const pageItems = [
    {
      label: appConfig.seo.title,
      to: '/',
      icon: 'ph:file-text',
    },
    {
      label: gameTypeToFullName('mhst2'),
      suffix: `${gameTypeToShortLabel('mhst2')} ${gameTypeToDescription('mhst2')} ${gameTypeToFullLabel('mhst2')}`,
      to: '/2',
      icon: 'ph:file-text',
    },
    {
      label: 'Monsters',
      to: '/2/monsters',
      icon: 'ph:file-text',
    },
    {
      label: 'Monsties',
      to: '/2/monsties',
      icon: 'ph:file-text',
    },
    {
      label: 'Eggs',
      to: '/2/eggs',
      icon: 'ph:file-text',
    },
    {
      label: 'Catavan Stands',
      to: '/2/catavan-stands',
      icon: 'ph:file-text',
    },
    {
      label: "Elder's Lair",
      to: '/2/elders-lair',
      icon: 'ph:file-text',
    },
    {
      label: 'Co-Op Quests',
      to: '/2/coop',
      icon: 'ph:file-text',
    },
    {
      label: 'Riding Actions',
      to: '/2/riding-actions',
      icon: 'ph:file-text',
    },
    {
      label: gameTypeToFullName('mhst1'),
      suffix: `${gameTypeToShortLabel('mhst1')} ${gameTypeToDescription('mhst1')} ${gameTypeToFullLabel('mhst1')}`,
      to: '/1',
      icon: 'ph:file-text',
    },
    {
      label: gameTypeToFullName('mhst3'),
      suffix: `${gameTypeToShortLabel('mhst3')} ${gameTypeToDescription('mhst3')} ${gameTypeToFullLabel('mhst3')}`,
      to: '/3',
      icon: 'ph:file-text',
    },
  ];

  const groups = computed(() => [
    {
      id: 'monsters',
      slot: 'monsters',
      label: 'Monsters',
      items: monsterItems,
    },
    {
      id: 'catavanStands',
      label: 'Catavan Stands',
      items: catavanStandItems,
    },
    {
      id: 'coopQuests',
      label: 'Co-Op Quests',
      items: coopQuestItems,
    },
    {
      id: 'ridingActions',
      label: 'Riding Actions',
      items: ridingActionItems,
    },
    {
      id: 'pages',
      label: 'Pages',
      items: pageItems,
    },
  ]);

  defineShortcuts({
    meta_k: () => (open.value = !open.value),
  });
</script>

<template>
  <DefineButtonTemplate>
    <UButton
      :icon="appConfig.ui.icons.search"
      color="neutral"
      variant="ghost"
      aria-label="Search"
    />
  </DefineButtonTemplate>

  <UModal v-model:open="open">
    <ReuseButtonTemplate v-if="open" />

    <UTooltip v-else text="Search" :kbds="['meta', 'k']">
      <ReuseButtonTemplate />
    </UTooltip>

    <template #content>
      <UCommandPalette
        :groups="groups"
        placeholder="Search anything..."
        class="h-[85dvh] lg:h-120"
        close
        selectedIcon=" "
        :ui="{ item: 'items-center', itemLabelSuffix: 'hidden' }"
        :fuse="{ fuseOptions: { includeMatches: true }, resultLimit: 10 }"
        @update:open="open = $event"
        @update:modelValue="open = false"
      >
        <template #monsters-leading="{ item }">
          <S2MonsterIcon :monster="item.data" noTooltip class="size-8" />
        </template>
      </UCommandPalette>
    </template>
  </UModal>
</template>
