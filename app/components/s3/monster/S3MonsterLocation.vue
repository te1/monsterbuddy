<script lang="ts" setup>
  import type { MonsterLocation } from '~/services/3/data';
  import { formatLocationType } from '~/services/3/presentation';

  const props = defineProps<{
    location: MonsterLocation;
  }>();

  const typeCaption = computed(() => formatLocationType(props.location.type));

  const caption = computed(() => {
    let result = props.location.region;

    if (props.location.area) {
      result += ` - ${props.location.area}`;
    }

    return result;
  });

  const hasLink = computed(() => false); // TODO link to region/area?
  // const hasLink = computed(() => ['coopQuest', 'eldersLair'].includes(props.location.type));

  const target = computed(() => {
    switch (props.location.type) {
      // case 'coopQuest':
      //   if (coopQuest.value) {
      //     return `/2/coop/${coopQuest.value.slug}`;
      //   }
      //   return '';

      //   case 'eldersLair':
      //     return `/2/elders-lair?floor=${props.location.main.toLowerCase()}`;

      default:
        return '';
    }
  });
</script>

<template>
  <div>
    {{ typeCaption }}:

    <AppNuxtLink v-if="hasLink" :to="target" :text="caption" />
    <span v-else v-text="caption" />
  </div>
</template>
