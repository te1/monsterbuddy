<template>
  <div>
    {{ typeCaption }}

    <NuxtLink
      v-if="hasLink"
      :to="target"
      class="link"
    >
      {{ caption }}
    </NuxtLink>

    <span v-else>
      {{ caption }}
    </span>
  </div>
</template>

<script>
  import _ from 'lodash';
  import { coopQuests } from '~/services/data';
  import { formatCoopQuest } from '~/services/utils';

  export default {
    name: 'MonsterLocation',

    props: {
      location: {
        type: Object,
        required: true,
      },
    },

    computed: {
      coopQuest() {
        if (this.location.type === 'coopQuest') {
          return _.find(coopQuests, { name: this.location.main });
        }
        return null;
      },

      typeCaption() {
        switch (this.location.type) {
          case 'coopQuest':
            return 'Co-Op Quest:';

          case 'subQuest':
            return 'Subquest: ';

          default:
            return null;
        }
      },

      caption() {
        let result = this.location.main;

        if (this.location.sub) {
          result += ` - ${this.location.sub}`;
        }

        switch (this.location.type) {
          case 'superRareDen':
            result = 'Super Rare Dens in ' + result;
            break;

          case 'coopQuest':
            if (this.coopQuest) {
              result = formatCoopQuest(this.coopQuest);
            }
            break;

          case 'eldersLair':
            result = "Elder's Lair - " + result;
            break;
        }

        return result;
      },

      hasLink() {
        return _.includes(['coopQuest', 'eldersLair'], this.location.type);
      },

      target() {
        switch (this.location.type) {
          case 'coopQuest':
            if (this.coopQuest) {
              return `/coop/${this.coopQuest.slug}`;
            }
            return '';

          case 'eldersLair':
            return `/elders-lair/?floor=${this.location.main}`;

          default:
            return '';
        }
      },
    },
  };
</script>
