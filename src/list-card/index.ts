import _ListCard from './index.vue'

import { withInstall } from '../utils/index'

export const ListCard = withInstall(_ListCard);

export default ListCard;

export type { ListCardProps } from './index.vue';

declare module 'vue' {
  export interface GlobalComponents {
    MListCard: typeof ListCard;
  }
}

