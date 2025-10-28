import _Header from './index.vue';

import { withInstall } from '../utils/index'

export const Header = withInstall(_Header);

export default Header;

export { HEADER_KEY } from './index.vue';
export type { HeaderProps } from './index.vue';

declare module 'vue' {
  export interface GlobalComponents {
    MHeader: typeof Header;
  }
}