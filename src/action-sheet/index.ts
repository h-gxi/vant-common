import _ActionSheet from './index.vue';

import { withInstall } from '../utils/index'

export const ActionSheet = withInstall(_ActionSheet);

export default ActionSheet;

declare module 'vue' {
  export interface GlobalComponents {
    MActionSheet: typeof ActionSheet;
  }
}