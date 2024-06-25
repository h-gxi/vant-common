<template>
  <div v-if="type === 'icon'" class="m-action-bar-item m-action-bar-icon" @click="onClick">
    <van-icon :name="icon" :dot="dot" :class-prefix="prefix" class="m-action-bar-icon__icon" />
    <span class="m-action-bar-icon__text">{{ text }}</span>
  </div>
  <div v-if="type === 'button'" class="m-action-bar-item m-action-bar-button" @click="onClick">
    <van-button type="primary" :disabled="disabled" :plain="plain" block round>{{ text }}</van-button>
    <slot />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, type ExtractPropTypes } from 'vue';
import { makeStringProp, extend } from '../utils';
import { useRoute, routeProps } from '../composables/use-route';
import { ACTIONBAR_KEY } from '../action-bar/index'
import { useParent } from '@vant/use'
const name = 'm-action-bar-item';

export type ActionType = 'icon' | 'button'

const actionBarIiemProps = extend({}, routeProps, {
  /** 按钮类型 'icon' | 'button' */
  type: makeStringProp<ActionType>('icon'),
  /** 图标 */
  icon: String,
  /** 类名前缀，用于使用自定义图标 */
  classPrefix: String,
  /** 是否显示图标右上角小红点 */
  dot: Boolean,
  /** 按钮文字 */
  text: String,
  /** 是否禁用按钮 */
  disabled: Boolean,
  /** 朴素按钮 */
  plain: Boolean
});
export type ActionBarIiemProps = ExtractPropTypes<typeof actionBarIiemProps>;

export default defineComponent({
  name,
  props: actionBarIiemProps,
  emits: ['click'],
  setup(props, { emit }) {
    const route = useRoute();
    const { parent } = useParent(ACTIONBAR_KEY)
    if (!parent) {
      if (process.env.NODE_ENV !== 'production') {
        console.error('[Vant] <m-action-bar> must be a child component of <m-action-bar>.')
      }
      return
    }

    const prefix = computed(()=> props.classPrefix || 'van-icon')

    const onClick = (event: MouseEvent) => {
      emit('click', event);
      route()
    }

    return {
      prefix,
      onClick
    } as any
  }
})
</script>
