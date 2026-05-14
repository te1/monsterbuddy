import { MonstieBuild } from '~/services/3/monstieBuilds';
import { useMonstieBuildEntity } from '~/composables/3/useMonstieBuild';

const useMonstieBuildManager = defineStore('s3/monstieBuildManager', () => {
  // -- state
  const buildId = ref<string | undefined>(undefined);
  const entity = useMonstieBuildEntity(buildId);

  // -- getters
  const build = computed<MonstieBuild | undefined>(() => {
    return entity.data.value ? MonstieBuild.fromEntity(entity.data.value) : undefined;
  });

  return {
    // -- state
    buildId,
    pending: entity.pending,

    // -- getters
    build,
  };
});

export default useMonstieBuildManager;
