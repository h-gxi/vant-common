import _Popup from './index.vue';

import { withInstall } from '../utils/index';

export const Popup = withInstall(_Popup);

export default Popup;

export { POPUP_KEY } from './index.vue';

declare module 'vue' {
  export interface GlobalComponents {
    MPopup: typeof Popup;
  }
}
