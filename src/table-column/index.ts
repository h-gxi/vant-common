import _TableColumn from './index.vue'

import { withInstall } from '../utils/index'

export const TableColumn = withInstall(_TableColumn);

export default TableColumn;

export type { TableColumnProps } from './index.vue';

declare module 'vue' {
  export interface GlobalComponents {
    MTableColumn: typeof TableColumn;
  }
}
