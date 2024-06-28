import _NoticebarSwipe from './index.vue'

import { withInstall } from '../utils/index'

export const NoticebarSwipe = withInstall(_NoticebarSwipe);

export default NoticebarSwipe;

export type { NoticebarSwipeProps } from './index.vue';

declare module 'vue' {
  export interface GlobalComponents {
    MNoticebarSwipe: typeof NoticebarSwipe;
  }
}
