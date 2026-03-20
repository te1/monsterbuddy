<script lang="ts" setup>
  import type { MonsterLocation } from '~/services/2/types';
  import { coopQuests } from '~/services/2/data';
  import { formatCoopQuest } from '~/services/2/presentation';

  const props = defineProps<{ location: MonsterLocation }>();

  const coopQuest = computed(() => {
    if (props.location.type === 'coopQuest') {
      return coopQuests.find((coopQuest) => coopQuest.name === props.location.main);
    }
    return undefined;
  });

  const typeCaption = computed(() => {
    switch (props.location.type) {
      case 'coopQuest':
        return 'Co-Op Quest:';

      case 'subQuest':
        return 'Subquest: ';

      default:
        return undefined;
    }
  });

  const caption = computed(() => {
    let result = props.location.main;

    if (props.location.sub) {
      result += ` - ${props.location.sub}`;
    }

    switch (props.location.type) {
      case 'superRareDen':
        result = `Super Rare Dens in ${result}`;
        break;

      case 'coopQuest':
        if (coopQuest.value) {
          result = formatCoopQuest(coopQuest.value);
        }
        break;

      case 'eldersLair':
        result = `Elder's Lair - ${result}`;
        break;
    }

    return result;
  });

  const hasLink = computed(() => ['coopQuest', 'eldersLair'].includes(props.location.type));

  const target = computed(() => {
    switch (props.location.type) {
      case 'coopQuest':
        if (coopQuest.value) {
          return `/2/coop/${coopQuest.value.slug}`;
        }
        return '';

      case 'eldersLair':
        return `/2/elders-lair?floor=${props.location.main.toLowerCase()}`;

      default:
        return '';
    }
  });
</script>

<template>
  <div>
    {{ typeCaption }}

    <AppNuxtLink v-if="hasLink" :to="target">
      {{ caption }}
    </AppNuxtLink>

    <span v-else>
      {{ caption }}
    </span>
  </div>
</template>
