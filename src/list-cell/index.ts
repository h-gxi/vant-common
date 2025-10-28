import _ListCell from './index.vue'

import { withInstall } from '../utils/index'

export const ListCell = withInstall(_ListCell);

export default ListCell;

declare module 'vue' {
  export interface GlobalComponents {
    MListCell: typeof ListCell;
  }
}

