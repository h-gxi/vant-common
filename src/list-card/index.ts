import _ListCard from './index.vue'

import { withInstall } from '../utils/index'

export const ListCard = withInstall(_ListCard);

export default ListCard;

declare module 'vue' {
  export interface GlobalComponents {
    MListCard: typeof ListCard;
  }
}

