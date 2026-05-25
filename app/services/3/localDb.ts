import type { Table } from 'dexie';
import type { MonstieBuildData } from './monstieBuilds';
import { Dexie } from 'dexie';

export type MonstieBuildEntity = {
  id: string;
  name: string | null;
  monstieSlug: string | null;
  data: MonstieBuildData;
  dataHash: string;
  /** boolean can't be indexed so use a number instead */
  pinned: 0 | 1;
  createdAt: Date;
  updatedAt: Date;
  viewedAt: Date;
};

const db = new Dexie('s3/monstieBuilds') as Dexie & {
  monstieBuilds: Table<MonstieBuildEntity, string>;
};

db.version(1).stores({
  monstieBuilds: 'id,dataHash,pinned,viewedAt', // id is primary key, the rest are indexes
});

export { db };
