import _PopupRadio from './index.vue';

import { withInstall } from '../utils/index';

export const PopupRadio = withInstall(_PopupRadio);

export default PopupRadio;

declare module 'vue' {
  export interface GlobalComponents {
    MPopupRadio: typeof PopupRadio;
  }
}
