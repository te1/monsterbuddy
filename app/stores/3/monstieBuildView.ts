import { useMonstieBuild } from '~/composables/3/useMonstieBuild';

const useMonstieBuildView = defineStore('s3/monstieBuildView', () => {
  // -- state
  const buildId = ref<string | undefined>(undefined);
  const build = useMonstieBuild(buildId);

  return {
    buildId,
    build: build.data,
    pending: build.pending,
  };
});

export default useMonstieBuildView;
