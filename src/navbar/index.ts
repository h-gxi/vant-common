import _NavBar from './index.vue';

import { withInstall } from '../utils/index'

export const NavBar = withInstall(_NavBar);

export default NavBar;

export type { NavbarProps } from './index.vue';

declare module 'vue' {
  export interface GlobalComponents {
    MNavBar: typeof NavBar;
  }
}