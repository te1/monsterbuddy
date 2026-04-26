import type { UpdateSpec } from 'dexie';
import type { MonstieBuildEntity } from '~/services/3/localDb';
import type { Gene } from '~/services/3/types';
import { customAlphabet } from 'nanoid';
import { uniq } from 'es-toolkit/array';
import { db } from '~/services/3/localDb';
import { MonstieBuild } from '~/services/3/monstieBuilds';
import { useMonstieBuildEntity } from '~/composables/3/useMonstieBuild';

const useMonstieBuildStore = defineStore('s3/monstieBuild', () => {
  const router = useRouter();

  // -- state
  const buildId = ref<string | undefined>(undefined);
  const entity = useMonstieBuildEntity(buildId);

  // -- getters
  const build = computed<MonstieBuild | undefined>(() => {
    return entity.data.value ? MonstieBuild.fromEntity(entity.data.value) : undefined;
  });

  const genes = computed(() => build.value?.genes ?? []);

  const row1Bingo = computed(() => getBingo(genes.value[0], genes.value[1], genes.value[2]));
  const row2Bingo = computed(() => getBingo(genes.value[3], genes.value[4], genes.value[5]));
  const row3Bingo = computed(() => getBingo(genes.value[6], genes.value[7], genes.value[8]));
  const col1Bingo = computed(() => getBingo(genes.value[0], genes.value[3], genes.value[6]));
  const col2Bingo = computed(() => getBingo(genes.value[1], genes.value[4], genes.value[7]));
  const col3Bingo = computed(() => getBingo(genes.value[2], genes.value[5], genes.value[8]));
  const diag1Bingo = computed(() => getBingo(genes.value[0], genes.value[4], genes.value[8]));
  const diag2Bingo = computed(() => getBingo(genes.value[2], genes.value[4], genes.value[6]));

  // -- actions
  async function goToNewBuild(): Promise<void> {
    if (build.value?.isEmpty()) {
      // we have a new empty build already so just reuse it

      router.push(`/3/builds/monstie/${build.value.id}`);

      return;
    }

    const id = generateLocalId();
    const now = new Date();

    // let data = new MonstieBuild(id); // TODO remove placeholder
    let data = MonstieBuild.fromPlaceholder(id);
    const dataHash = await data.getContentHash({ ignoreId: true });

    const entity = await db.monstieBuilds.get({ dataHash });

    if (entity != null) {
      // we have a build with the same content already so just reuse it
      data = MonstieBuild.fromEntity(entity);
    } else {
      const entity: MonstieBuildEntity = {
        id,
        name: data.name,
        monstieSlug: data.monstieSlug,
        data,
        dataHash,
        pinned: 0,
        createdAt: now,
        updatedAt: now,
        viewedAt: now,
      };

      await db.monstieBuilds.put(entity);
    }

    buildId.value = data.id;

    router.push(`/3/builds/monstie/${data.id}`);
  }

  async function saveBuild(build: MonstieBuild): Promise<void> {
    const now = new Date();

    const changes: UpdateSpec<MonstieBuildEntity> = {
      id: build.id,
      name: build.name,
      monstieSlug: build.monstieSlug,
      data: build,
      dataHash: await build.getContentHash({ ignoreId: true }),
      updatedAt: now,
      viewedAt: now,
    };

    await db.monstieBuilds.update(build.id, changes);
  }

  async function removeBuild(id: string): Promise<void> {
    await db.monstieBuilds.delete(id);
  }

  function getBingo(...genes: (Gene | undefined)[]) {
    const result: { bingo: boolean; element?: ElementType; type?: AttackType } = {
      bingo: false,
      element: undefined,
      type: undefined,
    };

    const elements = genes.map((gene) => gene?.element).filter((element) => element != null);
    if (elements.length === 3) {
      const uniqueElements = uniq(elements.filter((element) => element !== 'all'));
      if (uniqueElements.length === 1) {
        result.element = uniqueElements[0];
        result.bingo = true;
      }
    }

    const types = genes.map((gene) => gene?.type).filter((type) => type != null);
    if (types.length === 3) {
      const uniqueTypes = uniq(types.filter((type) => type !== 'all'));
      if (uniqueTypes.length === 1) {
        result.type = uniqueTypes[0];
        result.bingo = true;
      }
    }

    return result;
  }

  return {
    // -- state
    buildId,
    pending: entity.pending,

    // -- getters
    build,
    genes,
    row1Bingo,
    row2Bingo,
    row3Bingo,
    col1Bingo,
    col2Bingo,
    col3Bingo,
    diag1Bingo,
    diag2Bingo,

    // -- actions
    goToNewBuild,
    saveBuild,
    removeBuild,
  };
});

export default useMonstieBuildStore;

const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'; // no _-
const nanoid = customAlphabet(alphabet, 11);

function generateLocalId(): string {
  return '_' + nanoid();
}
