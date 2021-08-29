<template>
  <div class="relative flex items-center h-[122px]">
    <div class="w-[120px] h-[120px] -mx-3 flex-shrink-0 flex flex-col gap-2 items-center justify-center">
      <MonsterIcon :monster="monster" />

      <div class="flex gap-1 items-center">
        <AttackTypeIcon
          class="w-8 h-8"
          :monster="monster"
        />

        <ElementIcon
          class="w-8 h-8"
          :element="monster.monstie.attackElement"
        />
      </div>
    </div>

    <MonstieListItemContent
      class="w-full mt-3 ml-3 text-sm whitespace-nowrap self-start"
      :monster="monster"
      :mode="mode"
    />

    <MonsterImage
      class="w-full h-full p-2 object-contain object-right overflow-hidden"
      style="flex-basis: 250px;"
      :monster="monster"
      hideFallback
    />

    <div
      v-if="ticket"
      class="absolute top-0 right-0 px-2 py-0.5 rounded-bl text-xs font-semibold tracking-widest bg-gold/75 dark:bg-gold/25 text-gray-700 dark:text-gold"
    >
      SR
    </div>
  </div>
</template>

<script>
  export default {
    name: 'MonstieListItem',

    props: {
      monster: {
        type: Object,
        required: true,
      },

      mode: {
        type: String,
        required: false,
        default: 'location',
      },

      ticket: {
        type: String,
        required: false,
        default: null,
      },
    },
  };
</script>
