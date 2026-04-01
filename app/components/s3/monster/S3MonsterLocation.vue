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

  const hasLink = true; // always?

  const target = computed(() => {
    if (props.location.area != null) {
      return `/3/habitats/${props.location.regionSlug}/${props.location.areaSlug}`;
    }

    return `/3/habitats/${props.location.regionSlug}`;
  });
</script>

<template>
  <div>
    {{ typeCaption }}:

    <AppNuxtLink v-if="hasLink" :to="target" :text="caption" />
    <span v-else v-text="caption" />
  </div>
</template>
