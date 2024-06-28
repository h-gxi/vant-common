import _List from './index.vue'

import { withInstall } from '../utils/index'

export const List = withInstall(_List);

export default List;

export { LIST_KEY } from './index.vue';
export type { ListProps } from './index.vue';

declare module 'vue' {
  export interface GlobalComponents {
    MList: typeof List;
  }
}
