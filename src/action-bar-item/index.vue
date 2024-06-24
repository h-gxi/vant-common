<template>
  <div v-if="type === 'icon'" class="m-action-bar-item m-action-bar-icon">
    <van-icon :name="icon" :dot="dot" class="m-action-bar-icon__icon" />
    <span class="m-action-bar-icon__text">{{ text }}</span>
  </div>
  <div v-if="type === 'button'" class="m-action-bar-item m-action-bar-button">
    <van-button type="primary" block round>{{ text }}</van-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { ExtractPropTypes } from 'vue';
import { makeStringProp } from '../utils';
import { ACTIONBAR_KEY } from '../action-bar/index'
import { useParent } from '@vant/use'
const name = 'm-action-bar-item';

export type ActionType = 'icon' | 'button'
export const actionBarIiemProps = {
  /** 按钮类型 'icon' | 'button' */
  type: makeStringProp<ActionType>('icon'),
  /** 图标 */
  icon: {
    type: String,
    default: ''
  },
  /** 类名前缀，用于使用自定义图标 */
  classPrefix: {
    type: String,
    default: 'van-icon'
  },
  /** 是否显示图标右上角小红点 */
  dot: {
    type: Boolean,
    default: false
  },
  /** 按钮文字 */
  text: {
    type: String,
    default: ''
  }
}
export type ActionBarIiemProps = ExtractPropTypes<typeof actionBarIiemProps>;

export default defineComponent({
  name,
  props: actionBarIiemProps,
  setup() {
    const { parent } = useParent(ACTIONBAR_KEY)
    if (!parent) {
      if (process.env.NODE_ENV !== 'production') {
        console.error('[Vant] <m-action-bar> must be a child component of <m-action-bar>.')
      }
      return
    }

    return {}
  }
})
</script>
