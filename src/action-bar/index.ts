import _ActionBar from './index.vue';

import { withInstall } from '../utils/index'

export const ActionBar = withInstall(_ActionBar);

export default ActionBar;

export { ACTIONBAR_KEY } from './index.vue';

declare module 'vue' {
  export interface GlobalComponents {
    MActionBar: typeof ActionBar;
  }
}