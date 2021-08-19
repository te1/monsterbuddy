<template>
  <div class="flex items-center h-[122px]">
    <EggImage
      class="w-[120px] h-[120px] -mx-3 flex-shrink-0"
      :monster="monster"
    />

    <MonstieListItemContent
      class="w-full mt-3 ml-3 text-sm whitespace-nowrap self-start"
      :monster="monster"
      :mode="mode"
    />

    <MonsterImage
      class="w-full h-full p-2 object-contain object-right overflow-hidden"
      style="flex-basis: 250px;"
      :monster="monster"
    />
  </div>
</template>

<script>
  export default {
    name: 'EggListItem',

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
