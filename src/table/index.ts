import _Table from './index.vue'

import { withInstall } from '../utils/index'

export const Table = withInstall(_Table);

export default Table;

export { tableProps, TABLE_KEY } from './index.vue';
export type { TableProps } from './index.vue';

declare module 'vue' {
  export interface GlobalComponents {
    MTable: typeof Table;
  }
}