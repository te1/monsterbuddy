import { useMonstieBuild } from '~/composables/3/useMonstieBuild';

const useMonstieBuildEdit = defineStore('s3/monstieBuildEdit', () => {
  // -- state
  const buildId = ref<string | undefined>(undefined);
  const build = useMonstieBuild(buildId);

  return {
    buildId,
    build: build.data,
    pending: build.pending,
  };
});

export default useMonstieBuildEdit;
