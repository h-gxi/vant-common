import _Setps from './index.vue'

import { withInstall } from '../utils/index'

export const Setps = withInstall(_Setps);

export default Setps;

export { stepsProps, STEPS_KEY } from './index.vue';
export type { StepsProps } from './index.vue';

declare module 'vue' {
  export interface GlobalComponents {
    MSetps: typeof Setps;
  }
}
