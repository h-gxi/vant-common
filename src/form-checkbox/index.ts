import _FormCheckbox from './index.vue';

import { withInstall } from '../utils/index';

export const FormCheckbox = withInstall(_FormCheckbox);

export default FormCheckbox;

declare module 'vue' {
  export interface GlobalComponents {
    MFormCheckbox: typeof FormCheckbox;
  }
}
