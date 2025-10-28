import _SetpsItem from './index.vue'

import { withInstall } from '../utils/index'

export const SetpsItem = withInstall(_SetpsItem);

export default SetpsItem;

export type { StepsItemProps } from './index.vue';

declare module 'vue' {
  export interface GlobalComponents {
    MSetpsItem: typeof SetpsItem;
  }
}