import _PageContainer from './index.vue';

import { withInstall } from '../utils/index';

export const PageContainer = withInstall(_PageContainer);

export { PAGE_KEY } from './index.vue';
export default PageContainer;

declare module 'vue' {
  export interface GlobalComponents {
    MPageContainer: typeof PageContainer;
  }
}
