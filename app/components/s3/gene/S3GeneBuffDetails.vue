<script lang="ts" setup>
  import type { SkillBuff, SkillBuffSize } from '~/services/3/types';
  import { formatSkillBuffTurns } from '~/services/3/presentation';
  import { getBuff, getBuffDetails } from '~/services/3/genes';

  const props = defineProps<{ buff: SkillBuff }>();

  const description = computed(() => {
    return getBuff(props.buff.type)?.description;
  });

  const sizes = computed<(SkillBuffSize | undefined)[]>(() => {
    if (props.buff.size == null) {
      return [undefined];
    }

    if (props.buff.size === 'stacking') {
      return ['S', 'M', 'L'];
    }

    return [props.buff.size];
  });
</script>

<template>
  <div>
    <div class="space-x-1">
      <span v-text="buff.type" />
      <S3BuffSize :size="buff.size" />
      <span class="text-muted">on <S3SkillTarget :target="buff.target" /></span>
      <span
        v-if="buff.turns != null"
        class="text-muted"
        v-text="`(${formatSkillBuffTurns(buff.turns)})`"
      />
    </div>

    <div v-if="description" class="ml-3 text-muted" v-text="description" />

    <template v-for="size in sizes" :key="size">
      <S3BuffDetail
        v-for="detail in getBuffDetails(buff.type, size)"
        :key="detail.type"
        :detail="detail"
        :showSize="buff.size === 'stacking'"
        class="ml-3 text-muted"
      />
    </template>
  </div>
</template>
