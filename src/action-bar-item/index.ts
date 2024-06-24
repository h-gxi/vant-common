import _ActionBarItem from './index.vue';

import { withInstall } from '../utils/index'

export const ActionBarItem = withInstall(_ActionBarItem);

export default ActionBarItem;

export { actionBarIiemProps } from './index.vue';
export type { ActionBarIiemProps } from './index.vue';

declare module 'vue' {
  export interface GlobalComponents {
    MActionBarItem: typeof ActionBarItem;
  }
}