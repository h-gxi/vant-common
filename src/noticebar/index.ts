import _Noticebar from './index.vue'

import { withInstall } from '../utils/index'

export const Noticebar = withInstall(_Noticebar);

export default Noticebar;

export type { NoticebarProps } from './index.vue';

declare module 'vue' {
  export interface GlobalComponents {
    MNoticebar: typeof Noticebar;
  }
}
