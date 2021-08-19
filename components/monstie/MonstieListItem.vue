<template>
  <div class="flex items-center h-[122px]">
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
    },
  };
</script>
