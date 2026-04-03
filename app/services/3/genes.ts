import type { Gene } from './types';
import genes_ from '~/assets/3/genes.json';

const genes = genes_ as unknown as Gene[];

export { genes };
export const genesByName = keyBy(genes, 'name');
export const genesBySlug = keyBy(genes, 'slug');
