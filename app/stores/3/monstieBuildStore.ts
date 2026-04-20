import type { UpdateSpec } from 'dexie';
import type { MonstieBuildEntity } from '~/services/3/localDb';
import { MonstieBuild } from '~/services/3/monstieBuilds';
import { customAlphabet } from 'nanoid';
import { db } from '~/services/3/localDb';
import { useRouter } from 'vue-router';
import { useMonstieBuildEntity } from '~/composables/3/useMonstieBuild';

const useMonstieBuildStore = defineStore('s3/monstieBuild', () => {
  const router = useRouter();

  // -- state
  const buildId = ref<string | undefined>(undefined);
  const entity = useMonstieBuildEntity(buildId);

  // -- getters
  const build = computed<MonstieBuild | undefined>(() => {
    return entity.value ? MonstieBuild.fromEntity(entity.value) : undefined;
  });

  // -- actions
  async function setBuild(id: string): Promise<MonstieBuild | undefined> {
    if (build.value?.id === id) {
      return build.value;
    }

    buildId.value = id;

    return build.value;
  }

  async function newBuild(): Promise<MonstieBuild> {
    if (build.value?.isEmpty()) {
      // we have a new empty build already so just reuse it

      await router.push(`/3/builds/monstie/${build.value.id}`);

      return build.value;
    }

    const id = generateLocalId();
    const now = new Date();

    let data = new MonstieBuild(id);
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

    await router.push(`/3/builds/monstie/${data.id}`);

    return data;
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

  return {
    // -- state
    // ...

    // -- getters
    build,

    // -- actions
    setBuild,
    newBuild,
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
