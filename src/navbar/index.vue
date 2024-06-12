<template>
  <van-nav-bar
    v-if="isShow"
    class="m-nav-bar"
    :title="title"
    :left-text="leftText"
    :right-text="rightText"
    :left-arrow="leftArrow"
    :border="border"
    :fixed="fixed"
    :placeholder="placeholder"
    :z-index="zIndex"
    :safe-area-inset-top="safeAreaInsetTop"
    @click-left="onClickLeft"
    @click-right="onClickRight"
  >
    <template v-if="$slots.title" #title>
      <slot name="title" />
    </template>
    <template v-if="$slots.left" #left>
      <slot name="left" />
    </template>
    <template v-if="$slots.right" #right>
      <slot name="right" />
    </template>
  </van-nav-bar>
</template>

<script lang="ts">
import { computed, defineComponent, type ExtractPropTypes } from 'vue'
import { navbarProps as _navbarProps } from './props'

const name = 'm-nav-bar'

export const navbarProps = _navbarProps

export type NavbarProps = ExtractPropTypes<typeof navbarProps>;

export default defineComponent({
  name,
  props: navbarProps,
  emits: ['click-left', 'click-right'],
  setup(props, { emit }) {
    const isShow = computed(() => {
      if (props.show === 'auto') {
        return !/MicroMessenger/i.test(navigator.userAgent)
      }
      return props.show as boolean
    })

    const onClickLeft = () => {
      const { clickLeft } = props
      if (clickLeft) {
        const res = props.clickLeft()
        if (res === false) {
          return
        }
      }
      emit('click-left')
    }

    const onClickRight = () => {
      emit('click-right')
    }

    return {
      isShow,
      onClickLeft,
      onClickRight
    }
  }
})
</script>

